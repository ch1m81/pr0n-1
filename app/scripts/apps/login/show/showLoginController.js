define([
    'App',
		'components/auth', 
		'apps/login/show/showLoginView',
		'entities/user'		
], function ( App, auth, showLoginView, userEntety ) {
    
    'use strict';

    App.module( 'LoginApp.Show', function ( Show ) {
			Show.Controller = {

				showLoginPrompt: function ( options ) {	
				
						var loginView = new showLoginView.LoginView(/*{ model: newUser }*/);
							
							// the form has been submited to the controller
							loginView.on('pass:user:credentials', function ( email, password ) {								
								if (email && _.isString( email ) && password && _.isString( password )) {
									
									var userChannel = Backbone.Radio.channel( 'user' );		
									var requestLogin = userChannel.request( 'log:me:in', {
										email: email, 
										password: password 
									});
									
									// proceed login-request
									$.when( requestLogin ).done(function ( loginResponse ) {
										
										var authChannel = Backbone.Radio.channel('auth');
										authChannel.trigger('user:just:logged:in', loginResponse);
										
									}).fail( function ( response ) {
										
										console.log(response)
									
									});
								}
							});
														
							App.mainRegion.show(loginView);					
					
				}
			}
    });

    return App.LoginApp.Show.Controller;
});