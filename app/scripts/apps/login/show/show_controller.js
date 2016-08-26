define([
    'app',
		'apps/login/show/show_view',
		'entities/user_entity'
], function(pr0nApp) {
    pr0nApp.module('LoginApp.Show', function(Show, pr0nApp) {
			
			var Controller = Marionette.Controller.extend({
					
				showLogin: function() {
					var self = Show.Controller;
					var userChannel = Backbone.Radio.channel('user');							
					var fetchNewUserRequest = userChannel.request('get:user:new');					
					
					$.when(fetchNewUserRequest).then(function (newUser) {					
						var loginView = new Show.LoginView({ model: newUser });
							console.log(loginView)
							
							pr0nApp.mainRegion.show(loginView);						
					});									
				}
					
			});

			Show.Controller = new Controller();
    });

    return pr0nApp.LoginApp.Show;
});
