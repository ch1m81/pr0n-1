define([
    'app',
    'apps/article/list/list_view'
], function(pr0nApp) {
    pr0nApp.module('ArticleApp.List', function(List, pr0nApp, Backbone, Marionette, $, _) {
        var Controller = Marionette.Controller.extend({
            action: function() {
                var self = List.Controller;

                // FETCH RESULTS FROM ENTITY -----------------------------------
                var fetchRequest = pr0nApp.request('example:entities');

                $.when(fetchRequest).done(function(fetchedCollection) {
                    var exampleView = new List.ExampleView({
                        collection: fetchedCollection
                    });

                    // VIEW EVENTS ---------------------------------------------
                    self.listenTo(exampleView, 'view:action', function() {
                        pr0nApp.ArticleApp.trigger('example:otherAction');
                    });

                    pr0nApp.mainRegion.show(exampleView);
                }).fail(function(response, model) {
                    // If the rerouting is not done in the entity, then pass the response here and call the redirect method you want according to the response status (401, 403, 422, etc)

                });
            },

            action2: function() {
                // do operations here
            }
        });

        List.Controller = new Controller();
    });

    return pr0nApp.ArticleApp.List;
});
