define([
    'app',
		'apps/login/show/show_controller',
], function(pr0nApp) {

    // MODULE DEFINITION  ------------------------------------------------------
    pr0nApp.module('LoginApp', function(LoginApp, pr0nApp) {
        
				LoginApp.startWithParent = false;

				LoginApp.onStart = function () {   
					console.info('Starting LoginApp app');
        };

        LoginApp.onStop = function () {
            console.info('stopping LoginApp app');
        };
				
				// ROUTER --------------------------------------------------------------
        LoginApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'login': 'showLogin'
            }
        });
				
				// API -----------------------------------------------------------------
        var API = {
            showLogin: function() {
								console.log('login app matched route')
								pr0nApp.LoginApp.Show.Controller.showLogin();
            }
        };
				
				// EVENTS --------------------------------------------------------------
        var self = LoginApp;

        self.listenTo(LoginApp, 'show:login', function() {
            API.showLogin();
        });
				
        // INIT ----------------------------------------------------------------
        pr0nApp.addInitializer(function() {
            new LoginApp.Router({
                controller: API
            });
        });
				
    });

    return pr0nApp.LoginApp;
});
