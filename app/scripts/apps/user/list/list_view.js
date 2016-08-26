define([
    'app',
    'tpl!apps/user/list/templates/list_template.tpl',
    'tpl!apps/user/list/templates/list_collection_template.tpl'
], function(pr0nApp, ExampleTpl, ExampleCollectionTpl) { 
    pr0nApp.module('UserApp.List', function(List, pr0nApp, Backbone, Marionette, $, _) {

        // EXAMPLE -------------------------------------------------------
        List.ExampleView = Marionette.ItemView.extend({
            template: ExampleTpl,
            tagName: 'tr',
            events: {
                'click someElement': 'action'
            },
            action: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('view:action');
            }
        });

        List.ExampleCollectionView = Marionette.CollectionView.extend({
            tagName: 'table',
            template: ExampleCollectionTpl,
            childView: List.ExampleView,
            childViewContainer: 'tbody'
        });
    });

    return pr0nApp.UserApp.List;
});
