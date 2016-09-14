define([
    'App'
], function(App) {

    // CORE APP DEFINITION  ------------------------------------------------------
    App.module('CoreApp', function(CoreApp, App) {
			CoreApp.onStart = function () { 
				require(['apps/core/coreController'], function (coreController) {				
					App.CoreApp.showAll();
				});            
			};
    });

    return App.CoreApp;
});
