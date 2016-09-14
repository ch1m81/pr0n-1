// apps/core/coreController.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google, _, Marionette*/

define([
	'App', 
	'components/auth', 
	'apps/core/coreView',
	'entities/menu',
	'entities/user'
], function ( App, auth, coreView, menuEnteties, userEnteties ) {
		
		'use strict';
		
    App.module( 'CoreApp', function ( CoreApp ) {
			
			// main core controller ---------------------------------------------
			CoreApp.showAll = function () { 
				
				var userChannel = Backbone.Radio.channel( 'user' );
				var authChannel = Backbone.Radio.channel( 'auth' );	
				
				var grab_isUserLoged = authChannel.request( 'is:user:logged' );
				var fetchUser = userChannel.request( 'get:user:new' );	
				
				$.when( grab_isUserLoged, fetchUser ).then(function ( isUserLoged, userModel ) {	
									
					// this is emtpy user (new guest user)
					// if the user has been logged overwrite this user data with one stored in localStorage
					App.User = userModel;
					
					
					console.info("user logged 1");
					
					// display menu
					CoreApp.displayMenu({ isLoggedIn: isUserLoged });
					CoreApp.displayUserMenu({ isLoggedIn: isUserLoged });
					
				});				
			

				 /*var topBarLayout = new coreView.TopbarLayout();
		
					App.topbarRegion.show(topBarLayout);
					
					// FETCH MENU ITEMS 
								var fetchLanguage = App.request('menu:get:language');

								//when fetching menu has been done ->
								$.when(fetchLanguage).done(function (languageCollection) {				
						var languageCollectionView = new coreView.LanguageContainer({collection: languageCollection})
						topBarLayout.selectLanguageRegion.show(languageCollectionView);
					});*/
		
			},
				
				// HANDLE MENU ---------------------------------------------
					CoreApp.displayMenu = function( options ) {
									
						var menuChannel = Backbone.Radio.channel( 'menu' );	
						var fetchMenuRequest = menuChannel.request( 'get:menu' , options);

							$.when(fetchMenuRequest).done(function(menuCollection) {
									
									App.Menu = menuCollection;
									
									var topMenuView = new coreView.MenuCollection({
											collection: menuCollection
									});
									
									// clicked on menu item ---------------------------------------------
									topMenuView.on( 'childview:navigate:to', function( childView, model ) {
										App.trigger( model.get( 'navigationTrigger' ));	
									});

									App.topMenuRegion.show( topMenuView );
							});
					},
					
					// HANDLE USER ---------------------------------------------
					CoreApp.displayUserMenu = function( options ) {
							
							// if the user is logged in
							// get stored user data and overwrite guest one
							if ( options.isLoggedIn ) {
								var storedUserData = JSON.parse( localStorage.getItem( 'user' ));
								App.User.clear({ silent: true }).set( storedUserData );
								console.info("user logged 2")
							} 			
							
							console.dir("1", App.User.toJSON());
							console.dir("2", storedUserData);
							
							var userMenuView = new coreView.UserMenu({model: App.User});
							
							userMenuView.on("user:log:out", function () {
								var authChannel = Backbone.Radio.channel( 'auth' );				
									authChannel.trigger( 'user:just:logged:out' );
							});
							
							
							App.topUserMenuregion.show(userMenuView);
					}
					
					// NOTIFICATION CONTAINER ---------------------------------------------
					/*CoreApp.InitNotification = function() {

							
							var notificationChannel = Backbone.Radio.channel('notification');							
							var fetchNewNotificationCol = notificationChannel.request('get:notification');

							$.when(fetchNewNotificationCol).done(function(notificationCollection) {									
									
									var notificationCollectionView = new notificationView.Notification({
											collection: notificationCollection
									});
								
									App.notificationRegion.show(notificationCollectionView);
							});
					}	*/
    });

    return App.CoreApp;
});