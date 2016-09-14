define(['App'], function (App) {

    'use strict';

    App.module('ArticlesApp', function (ArticlesApp) {
        this.startWithParent = false;
				
				ArticlesApp.onStart = function () {
            console.info('starting Article app');
        };

        ArticlesApp.onStop = function () {
            console.info('stopping Article app');
        };
    });

// ROUTER ->
    App.module('Routers.ArticlesApp', function (ArticlesAppRouter) {

        var Router = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                'articles': 'showAllArticles'
            }
        });

        var executeAction = function (action, arg) {
            App.startSubApp('ArticlesApp');
            action(arg);
        };

// EVENTS ->
        App.on('articles:show', function (options) {          
						App.navigate('articles');
            API.showAllArticles(options);
        });
		
// API ->
        var API = {

					showAllArticles: function (options) {		
						require(['apps/articles/show/articlesShowController'], function (articlesShowController) {
							executeAction(articlesShowController.showArticles, options);
						});
					}
        };

        new Router({
            controller: API
        });

    });

    return App.ArticlesApp.ArticlesAppRouter;
});