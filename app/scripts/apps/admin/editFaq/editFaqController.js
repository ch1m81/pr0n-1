// apps/admin/editFaq/editFaqController.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define([
    'App',	
    'entities/faq',
	'entities/language',
    'entities/category',
	'components/notifications',
    'apps/admin/editFaq/editFaqView'
], function (App, faqEntety, langEntety, catEntety, notifications, editFaqView) {
    
    'use strict';

    App.module('AdminApp.EditFaq', function (EditFaq) {

        EditFaq.Controller = {

            editFaq: function (options) {
			
				// FETCH SINGLE FAQ 
				var fetchFaqModel = App.request('faq:get', options);
				var fetchLangCollection = App.request('language:list');
				var fetchCategoryCollection = App.request('faq:category:list');

				//when fetching faq has been done ->
				$.when(fetchFaqModel, fetchCategoryCollection, fetchLangCollection).done(function (faqModel, categoryCol, langCol) {
					
					if (faqModel.error) {
						App.notification.show(new notifications.Notification({title: newFaqModel.error.statusText, message: newFaqModel.error.responseText, msgtype: 'danger'}));
					} else {
						
						// fetch cat || lang went wrong
						if (categoryCol && categoryCol.error) {
							App.notification.show(new notifications.Notification({title: categoryCol.error.statusText, message: categoryCol.error.responseText, msgtype: 'danger'}));
							categoryCol = [];
						} if (langCol && langCol.error) {
							App.notification.show(new notifications.Notification({title: langCol.error.statusText, message: langCol.error.responseText, msgtype: 'danger'}));
							langCol = [];
						} 
												
						var editFaqFormView = new editFaqView.EditFaqForm({model:faqModel, catList: categoryCol.toJSON(), langList: langCol.toJSON()});

						editFaqFormView.on('faq:save', function (data, model) {
							
							model.save(data, {								
								wait:true,
								success: function(model, response) {
									App.notification.show(new notifications.Notification({title: 'Done', message: 'The FAQ has been successfully updated', msgtype: 'success'}));
								},
								error: function(model, response) {
									App.notification.show(new notifications.Notification({title: response.status, message: response.statusText, msgtype: 'danger'}));
								},
								complete: function () {
									editFaqFormView._behaviors[0].resetBtnState();									
								}
							});
							
						});
						
						App.mainRegion.show(editFaqFormView);		
					}
					
				});
            }
        }
    });

    return App.AdminApp.EditFaq.Controller;
});