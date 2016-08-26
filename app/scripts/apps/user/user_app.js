define([
    'app',
    'apps/user/show/show_controller',
    'apps/user/list/list_controller'
], function(pr0nApp) {

    // MODULE DEFINITION  ------------------------------------------------------
    pr0nApp.module('UserApp', function(UserApp, pr0nApp, Backbone, Marionette, $, _) {
            
        // ROUTER --------------------------------------------------------------
        UserApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'example': 'action',
                'otherExample': 'action2'
            }
        });

        // API -----------------------------------------------------------------
        var API = {
            action: function() {
                pr0nApp.UserApp.Show.Controller.action();
            },
            action2: function() {
                pr0nApp.UserApp.Show.Controller.action2();
            }
        };

        // EVENTS --------------------------------------------------------------
        var self = UserApp;

        self.listenTo(UserApp, 'example:action', function() {
            API.action();
        });

        self.listenTo(UserApp, 'example:otherAction', function() {
            API.action2();
        });

        // INIT ----------------------------------------------------------------
        pr0nApp.addInitializer(function() {
            new UserApp.Router({
                controller: API
            });
        });
    });

    return pr0nApp.UserApp;
});
