require([	
	'App'
], function ( App ) {
	
	'use strict';
	
	var authChannel = Backbone.Radio.channel( 'auth' );
	
	// is user logged in 
	// determinate user state according to localStorage.pr0n.token
	authChannel.replyOnce( 'is:user:logged', function() {  
		var retrievedObject = JSON.parse(localStorage.getItem( 'pr0n' ));
		var hasToken = ( _.isNull(retrievedObject) )? false : ( retrievedObject.token )?  true : false;
		
		return hasToken;
	});
	
	
	// LOG_IN
	// log user in
	// rerender menu
	// redirect user
	authChannel.on( "user:just:logged:in", function( userModel ) {
	
		var userModelData = userModel.toJSON(); // json output of the user model attributes
		var redirectTo = "*a"; // default redirect (can be anything since the def route has been defined in app.router)
				
		localStorage.setItem( "user", JSON.stringify( userModelData )); // set it localy in browser
		App.User.clear({ silent: true }).set( userModelData ); // set the App.User
		
		// if the user target was catched -> redirect him to it
		if ( App.uDesiredURL && App.uDesiredURL !== "login" ) {									
			redirectTo =  App.uDesiredURL;
			delete App.uDesiredURL									
		} 	
		console.log("redirect to ", redirectTo);
		
		App.Menu.createMenu({ isLoggedIn: true }) //refresh menu 
		App.navigate(redirectTo, {trigger: true, replace: true}); //redirect
		//App.trigger(redirectTo + ":show", {trigger: true, replace: true}); //redirect
		
	});
	
	// LOG_OUT
	// log user out
	// delete cookies
	// update App.User to empty model
	// rerender menu
	// delete localStorage
	// redirect user
	authChannel.on("user:just:logged:out", function(){		
		
		localStorage.removeItem("user");// remove user from localstorage		
		localStorage.removeItem("pr0n");// remove token from localstorage	
		
		App.User.clear({silent:true}).set(App.User.defaults);// update App.User model to default
		
		App.Menu.createMenu({ isLoggedIn: false }) // refresh menu 
		
		App.trigger("login:show");// redirect
		
	});
	
});

