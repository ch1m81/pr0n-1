define([
    'app',
    'apps/core/show/show_view',
    'components/auth',
    'entities/menu_entity',
    'entities/user_entity'
], function(pr0nApp) {
    pr0nApp.module('CoreApp.Show', function(Show, pr0nApp) {
			var Controller = Marionette.Controller.extend({
					
				showAll: function() {
					var self = Show.Controller;
					
					var authChannel = Backbone.Radio.channel('auth');						
					var grab_isUserLoged = authChannel.request('isUserLoged');
					
					
					console.log('controller before user is logged????')
					
					$.when(grab_isUserLoged).then(function (isUserLoged) {	

						console.log('controller before after is logged????', isUserLoged)					
						// yes user is looged in
						if (isUserLoged === true) {
							console.log('isUserLoged', isUserLoged)					
							self.displayMenu();								
							//self.displayUserMenu();			
							
						}		
					});										
				},			
				
					
					// HANDLE MENU
					displayMenu: function() {

						var self = Show.Controller;						
						var menuChannel = Backbone.Radio.channel('menu');	
						var fetchMenuRequest = menuChannel.request('get:menu');

							$.when(fetchMenuRequest).done(function(menuCollection) {
									
									var topMenuView = new Show.MenuCollection({
											collection: menuCollection
									});
									
									// VIEW EVENTS ---------------------------------------------
									//self.listenTo(topMenuView, 'view:action', function() {
									//		pr0nApp.CoreApp.trigger('example:otherAction');
									//});

									pr0nApp.topMenuRegion.show(topMenuView);
							});
					},
					
					// HANDLE USER
					displayUserMenu: function() {

							var self = Show.Controller;
							var userChannel = Backbone.Radio.channel('user');							
							var fetchUserRequest = userChannel.request('get:user');

							$.when(fetchUserRequest).done(function(userModel) {									
									
									//var topMenuView = new Show.MenuCollection({
									//		collection: menuCollection
									//});
									console.log('...:', userModel);

									//pr0nApp.topMenuRegion.show(topMenuView);
							});
					}				
					
			});

			Show.Controller = new Controller();
    });

    return pr0nApp.CoreApp.Show;
});
