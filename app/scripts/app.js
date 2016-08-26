define([
    'marionette',
		'bootstrap'
], function(Marionette, bootstrap) {

    var pr0nApp = new Marionette.Application();

    // REGIONS -----------------------------------------------------------------

    pr0nApp.addRegions({
        topMenuRegion: '#top-menu-region',
        topRegion: '#top-region',
        mainRegion: '#main-region',
        sideRegion: '#side-region'
    });

    // NAVIGATION --------------------------------------------------------------

    pr0nApp.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    pr0nApp.getCurrentRoute = function() {
        if (Backbone.history.fragment === undefined) return '';
        return Backbone.history.fragment;
    };

    // EVENTS ------------------------------------------------------------------

    pr0nApp.listenTo(pr0nApp, 'action:execute', function(action, params) {
			
			 // execute your code here for app wide events received for action "action:execute"

    });

    // INIT --------------------------------------------------------------------

    pr0nApp.listenTo(pr0nApp, 'start', function() {
        
				if (Backbone.history) {            
						require([
								'apps/core/core_app',
								'apps/login/login_app'
						], function (coreApp) {                    
								console.info('app started -> yeea ');
								Backbone.history.start();
						});
           
        }

    });

    return pr0nApp;

});
