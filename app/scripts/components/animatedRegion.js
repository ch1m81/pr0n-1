// components/animatedRegion.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define([
    'App', 'marionette'
], function (App, Marionette) {

    'use strict';

    return Marionette.Region.extend({

        animationType: 'fade-in',
        attachHtml: function (view) { 
            this.$el.addClass('noDisplay').html(view.el).addClass(Marionette.getOption(this, 'animationType'));
        }
    });
});