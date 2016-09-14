// apps/admin/AdminApp.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define(['App'], function (App) {

    'use strict';

    App.module('AdminApp', function (AdminApp) {

        this.startWithParent = false;

        AdminApp.onStart = function () {
            console.info('starting ADMIN app');
        };

        AdminApp.onStop = function () {
            console.info('stopping ADMIN app');
        };
    });

// ROUTER ->
    App.module('Routers.AdminApp', function (AdminAppRouter) {

        var Router = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                'faq/new': 'newFaq',
				'faq/:id/edit': 'editFaq',
				'rf': 'listRf'
				
            }
        });

        var executeAction = function (action, arg) {
            App.startSubApp('AdminApp');
            action(arg);
        };

// EVENTS ->
        App.on('faq:new', function (options) {
            App.navigate('faq/new');
            API.newFaq(options);
        });
		
		App.on('faq:edit', function (options) {
            var faqID = options.faqID;
            App.navigate('faq/' + faqID + '/edit');
            API.editFaq(faqID);
        });
		
		App.on('rf:list', function (options) {           
            App.navigate('rf');
            API.listRf(options);
        });
		
		
		
// API ->
        var API = {

            newFaq: function (options) {
                require(['apps/admin/newFaq/newFaqController'], function (newFaqController) {
                    executeAction(newFaqController.createFaq, options);
                });
            },
			
			editFaq: function (faqID) {			
				require(['apps/admin/editFaq/editFaqController'], function (editFaqController) {
                    executeAction(editFaqController.editFaq, {faqID: faqID});
                });
            },
			
			listRf: function () {			
				require(['apps/admin/rfList/rfListController'], function (rfListController) {
                    executeAction(rfListController.listRF);
                });
            },
        };

        new Router({
            controller: API
        });

    });

    return App.AdminApp.AdminAppRouter;
});