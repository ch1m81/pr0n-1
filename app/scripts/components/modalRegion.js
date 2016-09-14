// components/modalRegion.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/
define([
    'App',
    'marionette',
], function (App, Marionette) {

    'use strict';

    return Marionette.Region.extend({

        initialize: function (options) {
            this.options = options || {};
        },
		
        onShow: function (view) {

            var self = this;

            this.$el.one('hide.bs.modal', function (event) {
                view.destroy();
                self.trigger('modal:closed');
            });

            this.$el.modal(this.options);
        },
		
        onBeforeDestroy: function () {
            this.$el.modal('hide');
        }
    });
});