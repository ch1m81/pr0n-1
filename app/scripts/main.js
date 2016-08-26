require.config({
	urlArgs: 'bust=' + (new Date()).getTime(),
	
	baseUrl: 'scripts',
	locale: 'en',
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			deps: [
				'jquery'
			],
			exports: '_'
		},
		'backbone': {
			deps: [
				'jquery',
				'underscore'
			],
			exports: 'backbone'
		},
		marionette: {
			exports: 'marionette',
			deps: ['backbone', 'backbone.babysitter', 'backbone.radio', 'backbone.wreqr']
		},
		bootstrap: {
			exports: 'bootstrap',
			deps: ['jquery']
		},
		cookie: {
			exports: 'cookie'
		},
		localforage: {
			exports: 'localforage'
		},
		
	},
	paths: {	
		marionette: 'vendor/backbone.marionette',
		backbone: 'vendor/backbone',
		underscore: 'vendor/underscore',
		'backbone.babysitter': 'vendor/backbone.babysitter',
		'backbone.wreqr': 'vendor/backbone.wreqr',
		'backbone.radio': 'vendor/backbone.radio',
		
		bootstrap: 'vendor/bootstrap',
		
		jquery: 'vendor/jquery',
		
		cookie: 'vendor/js.cookie',
		localforage: 'vendor/localforage',
		
		requirejs: 'vendor/require',
		'text': 'vendor/text'
	},
	packages: [	

	]
});


// start the app
require([
	'app'
], function(pr0nApp) {
	//console.info('main.js ....', pr0nApp); 
	pr0nApp.start();
});