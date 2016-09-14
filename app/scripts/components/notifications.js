define([
	'App', 
	'text!components/templates/notification.html', 
	'text!components/templates/loader.html' 
	//'i18n!config/nls/notification'
	], function (App, notificationTpl, loaderTpl/*, notificationLng*/) {

    'use strict';

    App.module('Notification.Views', function (Views) {

        // loader
		Views.Loader = Marionette.ItemView.extend({ //constructor
            template: _.template(loaderTpl),
            className: 'loader-container',

            title: 'Loading Data',
            message: 'Please wait, data is loading.',

            serializeData: function () {
                return {
                    title: Marionette.getOption(this, 'title'),
                    message: Marionette.getOption(this, 'message')
                }
            }
        }),
		
		// notification
		Views.NotificationItem = Marionette.ItemView.extend({ //constructor

			template: _.template(notificationTpl),
			title: 'I Notify',
			message: 'I have... had to notify something... but I dont know any more what exact(???)',
			msgtype: 'info', //info, warning, danger

			serializeData: function () {

				var title = Marionette.getOption(this, 'title');
					title = notificationLng[title] ? notificationLng[title] : title;
				var message = Marionette.getOption(this, 'message');
					message = notificationLng[message] ? notificationLng[message] : message;

				return {
					title: title,
					message: message,
					msgtype: Marionette.getOption(this, 'msgtype')
				}
			},
			events: {
				'click': 'closeNotification',
			},
			
			automaticClose: true,
			
			onShow: function () {

				var automaticClose = Marionette.getOption(this, 'automaticClose');

				if (automaticClose) {
					var self = this;
					_.delay(function () {
						self.closeNotification();
					}, 5000);
				}
			},
			
			
			closeNotification: function () {
				var self = this;
				self.$el.children().addClass('bounceOutUp');
					
				_.delay(function () {
					self.destroy();				
				}, 2000);
			}
		});
		
		/*
		// Notification CollectionView
		Views.Notification = Marionette.CollectionView.extend({ //constructor
			childView: Views.NotificationItem			
		});
		*/
		
		
		
	});

    return App.Notification.Views;
});