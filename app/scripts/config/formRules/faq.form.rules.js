/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, _*/

define([
	'App'
], function (App) {

	'use strict';

	return Marionette.Object.extend({		
	
		fieldRules: function () {
			return {
				'faqTitle': function (a) { return _.chain(a).trim().capitalize().value();}
			}
		}, 
	});

});