
require([
    'App', 'cookie'
], function(App, Cookies) {

    'use strict';

    var $doc = $(document);

// AJAX CONFIG		
    $.ajaxSetup({				
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			cache: false
    });

// BEFORE AJAX SEND		
		// before sending the ajax
		// retrive (if exist) the token from the localStorage
		// inject the token in the request header
		$doc.ajaxSend(function(event, xhr, settings) {
			
			if (settings.isLogging === true) return true; //dont set the auth.header
				
			var retrievedObject = JSON.parse(localStorage.getItem('pr0n'));
			if (retrievedObject && !_.isNull(retrievedObject)) xhr.setRequestHeader('Authorization', retrievedObject.token);
	
	});
		
// AJAX SUCCESS		
		// after the ajax request completes successfully 
		// retrive (if exist) the token from the response hedear
		// store the response token into localStorage
		$doc.ajaxSuccess(function(event, xhr) {			
			var responseToken = xhr.getResponseHeader('Authorization');	
				if (responseToken && !_.isNull(responseToken)) localStorage.setItem('pr0n', JSON.stringify({token: responseToken}));
		});
		
//	AJAX ERROR		
	$doc.ajaxError(function (event, jqxhr, settings, thrownError) {
		
		if ((jqxhr.status === 400
									&& (jqxhr.responseJSON.error === 'token_not_provided'
												|| jqxhr.responseJSON.error === 'token_invalid')) 
					|| (jqxhr.status === 404 && jqxhr.responseJSON.error === 'user_not_found') 
					|| jqxhr.status === 401 
					|| jqxhr.status === 403
		) {
			
			// catch desired URL, after login redirect it to it
			App.uDesiredURL = Backbone.history.fragment;
			
			var authChannel = Backbone.Radio.channel( 'auth' );
			authChannel.trigger( 'user:just:logged:out' );
			
			console.log(event)
			console.log(jqxhr)
			console.log(settings)
			console.log(thrownError)
			
			
			//console.info("not logged in -> trigger redirect to login")
			//localStorage.removeItem('pr0n');		
			//App.trigger('login:show');		
		}
	});
});

