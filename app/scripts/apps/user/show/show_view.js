define([
    'app',
    'tpl!apps/user/show/templates/show_template.tpl'
], function(pr0nApp, ExampleTpl) { 
    pr0nApp.module('UserApp.Show', function(Show, pr0nApp, Backbone, Marionette, $, _) {

        // EXAMPLE -------------------------------------------------------
        Show.ExampleView = Marionette.ItemView.extend({
            template: ExampleTpl,
            events: {
                'click someElement': 'action'
            },
            action: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('view:action');
            }
        });
    });

    return pr0nApp.UserApp.Show;
});
