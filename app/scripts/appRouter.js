define([
    'App'
], function (App) {
    'use strict';

    var AppRouter = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'defaultRoute', //default route
            '*anything': 'defaultRoute' //default route
        }
    });

    var API = {
        defaultRoute: function () {           
            App.trigger('articles:show');
        },
    };

    App.addInitializer(function () {
        new AppRouter({
            controller: API
        });
    });

    return App.AppRouter;
});