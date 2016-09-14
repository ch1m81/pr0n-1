// apps/requestForm/show/requestFormController.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define([
    'App',
    'entities/article',
    'apps/articles/show/articlesShowView',
    //"components/notifications"
], function (App, articleEntety,articlesShowView/*, notifications*/) {
    
    'use strict';

    App.module('ArticlesApp.ArticlesShow', function (ArticlesShow) {

			ArticlesShow.Controller = {
				showArticles: function (options) {
					
					
					var dataChannel = Backbone.Radio.channel('data');							
					var fetchArticles = dataChannel.request('get:articles');
					
					$.when(fetchArticles).done(function (articlesCollection) {
						var articlesLayoutView = new articlesShowView.AriclesLayout();
					
						articlesLayoutView.on('show', function () {
							var articlesListCollectionView = new articlesShowView.ArticlesListCollection({
								collection: articlesCollection
							});
						
							articlesLayoutView.articlesList.show(articlesListCollectionView);
						
						});
					
						App.mainRegion.show(articlesLayoutView);
						
					}).fail(function (error) {
							console.warn(error);
					});
										
					
					/*
					App.mainRegion.show(new notifications.Loader());					
					
					var faq_ID = options.faqID;
					
					var newRequestFormRequest = App.request("get:new:requestform");
					var fetchFaqModel = App.request("faq:get", options);				
					
					$.when(newRequestFormRequest, fetchFaqModel).done(function (newRequestForm, faqModel) {	
						
						if (faqModel.error) {
							App.notification.show(new notifications.Notification({title: newFaqModel.error.statusText, message: newFaqModel.error.responseText, msgtype: "danger"}));
						} else if (newRequestForm.error) {
							App.notification.show(new notifications.Notification({title: newRequestForm.error.statusText, message: newRequestForm.error.responseText, msgtype: "danger"}));
						} else {
							
							newRequestForm.set("faq_ID", faqModel.get("faqID"), {silent: true});
							
							var RFormView = new requestFormShowView.RequestForm({
								model:newRequestForm,
								formParent: faqModel							
							});
							
							// on error upload-file (and just a file)
							RFormView.on("doc:upload:error", function (errorObj) {							
								App.notification.show(new notifications.Notification({title: errorObj.error.type, message: errorObj.error.message, msgtype: "warning"}));
							});
							
							// on error upload-file (and just a file)
							RFormView.on("doc:upload:success", function (response) {							
								newRequestForm.set("rfIDCard", response.newTempFileName, {silent: true});							
							});
							
							// on error upload-file (and just a file)
							RFormView.on("rf:save", function (data) {
								
								newRequestForm.save(data, {								
									success: function(model, response) {																			
										App.notification.show(new notifications.Notification({title: "Done", message: "Your request has benn succesfully submited. We will try to solve it PASA" , msgtype: "success"}));
										App.trigger("faq:list:show");
									},
									error: function(model, response) {
										App.notification.show(new notifications.Notification({title: response.type, message: response.message, msgtype: "warning"}));
									}								
								});	
							});	
							
							// on cancel
							RFormView.on("cancel", function (data) {							
								App.trigger("faq:list:show");
							});					
							
							
							App.mainRegion.show(RFormView);	
						}
					});*/
				}
			}
    });

    return App.ArticlesApp.ArticlesShow.Controller;
});