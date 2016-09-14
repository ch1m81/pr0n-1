// apps/admin/editFaq/editFaqView.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define([
    'App',
	'tinyMCE',
	'bootstrap-toggle',
	'behaviors/form/formFaq',	
    'text!apps/admin/editFaq/templates/editFaq.html'
], function (App, tinyMCE, bootstrapToggle, formFaqBehavior, editFaqTpl) {

    'use strict';

    App.module('AdminApp.EditFaq.View', function (View) {		

// FAQ Single form ->		
        View.EditFaqForm = Marionette.ItemView.extend({
            className: 'row',
			
			template: _.template(editFaqTpl),
			
			ui: {
				'faqPublished': '#faqPublished',//save changes button					
			},
			
			templateHelpers: function(){			
				
				var sinceLastChange = this.model.sinceThenFormated('popLastUpdate');
								
				//var deleteButton = (this.model.difInDays(this.model.get('popCreatedOn')) > 10)? false:true;
				
				return {
					sinceLastChange: sinceLastChange,
					catList: this.options.catList,
					langList: this.options.langList
				}
			},
			
			onShow: function () {				
				this.initialiseTinyMCE();
			},
			
			onDomRefresh: function () {				
				if (tinymce.editors.length > 0) {					
					tinymce.execCommand('mceRemoveEditor',false,'tinymceOnMe');
					tinymce.execCommand('mceAddEditor',false,'tinymceOnMe');
				}
				
				this.$(this.ui.faqPublished).bootstrapToggle();
			},
			
			behaviors: {
                validateForm: {
                    behaviorClass: formFaqBehavior
                }
            },
			
			modelEvents: {
				'change': 'render'
			},
			
			initialiseTinyMCE: function() {
				tinyMCE.init({
					selector: '#tinymceOnMe',					
					setup: function(editor) {
						editor.on('init', function() {
						  
						});
					},
					height: 400,
					plugins: [
						'autoresize fullscreen',
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table contextmenu paste code'
					],
					
					toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
					toolbar2: 'preview fullscreen',
					content_css: [
						
					],
					autoresize_bottom_margin: 50
				});
			},
			
			
			saveIt: function (data) {
				this.trigger('faq:save', data, this.model);
			},
			
        });
	});
		

    return App.AdminApp.EditFaq.View;
});