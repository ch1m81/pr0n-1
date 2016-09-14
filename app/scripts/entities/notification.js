/*define(['App'], function (App) {

    'use strict';

    App.module('Entities.Notification', function (notificationEntities) {

	// MENU MODEL
			notificationEntities.NotificationModel = Backbone.Model.extend({
				defaults: {
					name: 'defaultName',
					id: '',
					url: 'defaultUrl',
					icon: 'defaultIcon',
					navigationTrigger: false,
					isSelected: false,
					subMenu: []
				}
				
			});

		// MENU COLLECTION
			notificationEntities.NotificationCollection = Backbone.Collection.extend({
				model: notificationEntities.NotificationModel
			});
		
		
			
		// PRIVATE 
			var notificationChannel = Backbone.Radio.channel('notification');							
					
// API ->
			var API = { 
			
				getNotification: function() {	
					console.log("not")
					return new notificationEntities.NotificationCollection();
				}
			};

			
// REQUESTS ->
			//Get all models
			notificationChannel.reply('get:notification', function() {            
				return API.getNotification();
			});
				
		});
		return App.Entities.Notification;
});*/