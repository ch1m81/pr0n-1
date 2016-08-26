define([
    'app',
		'cookie',
		'localforage'
], function(pr0nApp) {
    pr0nApp.module('Auth', function(Auth, pr0nApp) {
     
		'use strict' 
		
		var authChannel = Backbone.Radio.channel('auth');
		
		
		authChannel.reply('isUserLoged', function () {
			var defer = $.Deferred();
			
			console.log('asked for auth')
			
			return $.Deferred(function( dfd ) {						
					dfd.resolve(true);					
			}).promise();
			
		});
		
		
		// return true or false depending on cookies
    //pr0nApp.reqres.setHandler("isLoggedIn", function () {
        //if (Cookies.get('pr0n')) {
        //    var c = Cookies.getJSON('pr0n');
        //   
        //    return Boolean(c.token);
        //}
			
				
        //return true;
   // });
	
		return pr0nApp.Auth;
	});
});

