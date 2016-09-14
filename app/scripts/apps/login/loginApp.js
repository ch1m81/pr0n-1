


define([
    'App'
], function(App) {

 'use strict';

    App.module('LoginApp', function (LoginApp) {
        this.startWithParent = false;
    });

// ROUTER ->
    App.module('Routers.LoginApp', function (LoginAppRouter) {

        var Router = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                'login': 'showLoginPrompt'
            }
        });

        var executeAction = function (action, arg) {
            App.startSubApp('LoginApp');
            action(arg);
        };

// EVENTS ->
        App.on('login:show', function (options) {
            App.navigate('login');
            API.showLoginPrompt(options);
        });
		
// API ->
        var API = {

            showLoginPrompt: function (options) {
                require(['apps/login/show/showLoginController'], function (loginController) {
                    console.log('triggered login app');
										executeAction(loginController.showLoginPrompt, options);
                });
            }
        };

        new Router({
            controller: API
        });

    });

    return App.LoginApp.LoginAppRouter;
});