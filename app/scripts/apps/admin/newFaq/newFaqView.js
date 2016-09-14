// apps/admin/newFaq/newFaqView.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define([
    'App',
	'tinyMCE',
	'bootstrap-toggle',
	'behaviors/form/formFaq',	
    'text!apps/admin/newFaq/templates/newFaq.html'
], function (App, tinyMCE, bootstrapToggle, formFaqBehavior, newFaqTpl) {

    'use strict';

    App.module('AdminApp.NewFaq.View', function (View) {		

// FAQ Single form ->		
        View.NewFaqForm = Marionette.ItemView.extend({
            className: 'row',
			
			template: _.template(newFaqTpl),
			
			ui: {
				'faqPublished': '#faqPublished',//save changes button				
			},
			
			templateHelpers: function () {
				
				return {
					catList: this.options.catList,
					langList: this.options.langList
				}
			},
			
			onShow: function () {			
				tinyMCE.init({
					selector: 'textarea.tinymceOnMe'				  
				});
				this.$(this.ui.faqPublished).bootstrapToggle()
			},
			
			behaviors: {
                validateForm: {
                    behaviorClass: formFaqBehavior
                }
            },
			
			saveIt: function (data) {				
				this.trigger('faq:new:save', data, this.model);				
			},
			
			
        });
	});
		

    return App.AdminApp.NewFaq.View;
});