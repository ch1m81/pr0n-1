// apps/admin/rfList/rfListController.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define([
    'App',	
    'entities/requestForm',
	'components/notifications',
    'apps/admin/rfList/rfListView'
], function (App, requestForm, notifications, rfListView) {
    
    'use strict';

    App.module('AdminApp.RFList', function (RFList) {

        RFList.Controller = {

            listRF: function (options) {
				
				var rfLayoutView = new rfListView.RFListLayout();	
				
				rfLayoutView.on('show', function () {
					rfLayoutView.RFListRegion.show(new notifications.Loader())
				});
				
				App.mainRegion.show(rfLayoutView);
				
				var fetchRFs= App.request('get:requestform:list');
				
				$.when(fetchRFs).done(function (RFsCol) {	
					
					if (RFsCol.error) {					
						App.notification.show(new notifications.Notification({title: RFsCol.error.statusText, message: RFsCol.error.responseText, msgtype: 'danger'}));
					}  else {
						
						var RFColView = new rfListView.RFItems({collection:RFsCol});				
						
						RFColView.on('childview:update:rf', function (childview, model, isChecked) {
							console.log(childview, isChecked)
							_.delay(function () {
								model.save({rfSolved:isChecked}, {								
									wait:true,
									success: function(model, response) {
										App.notification.show(new notifications.Notification({title: 'Saved', message: 'The Request-Form \'done\' status has been successfully saved.', msgtype: 'success'}));
									},
									error: function(model, response) {									
										App.notification.show(new notifications.Notification({title: response.status, message: response.statusText, msgtype: 'danger'}));
									}
								})
								},1000
							)
						});
						rfLayoutView.RFListRegion.show(RFColView);						
					}
				});
				
            }
        }
    });

    return App.AdminApp.RFList.Controller;
});