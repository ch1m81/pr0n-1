// apps/admin/NewFaq/newFaqController.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define([
    'App',	
    'entities/faq',
    'entities/language',
    'entities/category',
	'components/notifications',
    'apps/admin/newFaq/newFaqView'
], function (App, faqEntety, langEntety, catEntety, notifications, newFaqView) {
    
    'use strict';

    App.module('AdminApp.NewFaq', function (NewFaq) {

        NewFaq.Controller = {

            createFaq: function (options) {
			
				// FETCH NEW FAQ 
				var fetchNewFaqModel = App.request('faq:new');
				var fetchLangCollection = App.request('language:list');
				var fetchCategoryCollection = App.request('faq:category:list');

				//when fetching menu has been done ->
				$.when(fetchNewFaqModel, fetchCategoryCollection, fetchLangCollection).done(function (newFaqModel, categoryCol, langCol) {				
							
					
					if (newFaqModel.error) {
						App.notification.show(new notifications.Notification({title: newFaqModel.error.statusText, message: newFaqModel.error.responseText, msgtype: 'danger'}));
					} else {
						
						// fetch cat || lang went wrong
						if (categoryCol.error) {
							App.notification.show(new notifications.Notification({title: categoryCol.error.statusText, message: categoryCol.error.responseText, msgtype: 'danger'}));
							categoryCol = [];
						} if (langCol.error) {
							App.notification.show(new notifications.Notification({title: langCol.error.statusText, message: langCol.error.responseText, msgtype: 'danger'}));
							langCol = [];
						} 
						
						var newFaqForm = new newFaqView.NewFaqForm({model:newFaqModel, catList: categoryCol.toJSON(), langList: langCol.toJSON()});
												
						newFaqForm.on('faq:new:save', function (data, model) {							
							model.save(data, {								
								wait:true,
								success: function(model, response) {
									App.trigger('faq:edit', {faqID: model.get('faqID')});
								},
								error: function(model, response) {
									console.log('nop', model, response)
								},
								complete: function () {
									newFaqForm._behaviors[0].resetBtnState();									
								}
							});
							
						});
						
						App.mainRegion.show(newFaqForm);						
					}
					
				});
            }
        }
    });

    return App.AdminApp.NewFaq.Controller;
});