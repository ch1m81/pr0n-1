define([
    'app',
    'apps/article/show/show_view'
], function(pr0nApp) {
    pr0nApp.module('ArticleApp.Show', function(Show, pr0nApp) {
        var Controller = Marionette.Controller.extend({
            action: function() {

                var self = Show.Controller;

                // FETCH RESULTS FROM ENTITY -----------------------------------
                var fetchRequest = pr0nApp.request('someEntity:entity');

                $.when(fetchRequest).done(function(fetchedModel) {
                    var exampleView = new Show.ExampleView({
                        model: fetchedModel
                    });

                    // VIEW EVENTS ---------------------------------------------
                    self.listenTo(exampleView, 'view:action', function() {
                        pr0nApp.ArticleApp.trigger('example:otherAction');
                    });

                    pr0nApp.mainRegion.show(exampleView);
                });
            },

            action2: function() {
                // do operations here
            }
        });

        Show.Controller = new Controller();
    });

    return pr0nApp.ArticleApp.Show;
});
