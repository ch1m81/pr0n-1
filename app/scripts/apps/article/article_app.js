define([
    'app',
    'apps/article/show/show_controller',
    'apps/article/list/list_controller'
], function(pr0nApp) {

    // MODULE DEFINITION  ------------------------------------------------------
    pr0nApp.module('ArticleApp', function(ArticleApp, pr0nApp, Backbone, Marionette, $, _) {
            
        // ROUTER --------------------------------------------------------------
        ArticleApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'example': 'action',
                'otherExample': 'action2'
            }
        });

        // API -----------------------------------------------------------------
        var API = {
            action: function() {
                pr0nApp.ArticleApp.Show.Controller.action();
            },
            action2: function() {
                pr0nApp.ArticleApp.Show.Controller.action2();
            }
        };

        // EVENTS --------------------------------------------------------------
        var self = ArticleApp;

        self.listenTo(ArticleApp, 'example:action', function() {
            API.action();
        });

        self.listenTo(ArticleApp, 'example:otherAction', function() {
            API.action2();
        });

        // INIT ----------------------------------------------------------------
        pr0nApp.addInitializer(function() {
            new ArticleApp.Router({
                controller: API
            });
        });
    });

    return pr0nApp.ArticleApp;
});
