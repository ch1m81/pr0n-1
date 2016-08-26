define([
    'app'
], function(pr0nApp) {

    // MODULE DEFINITION  ------------------------------------------------------
    pr0nApp.module('CoreApp', function(CoreApp, pr0nApp) {
        

				CoreApp.onStart = function () {   
					console.info('start CoreApp app');
					require(['apps/core/show/show_controller'], function (coreShowController) {
					
						pr0nApp.CoreApp.Show.Controller.showAll();
					});            
        };

        CoreApp.onStop = function () {
            console.info('stopping CoreApp app');
        };
    });

    return pr0nApp.CoreApp;
});
