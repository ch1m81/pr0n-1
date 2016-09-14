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
				'rfFirstName': function (a) { return _.chain(a).trim().capitalize().value();},
				'rfLastName': function (a) { return _.chain(a).trim().capitalize().value();},
				'rfMobileNumber': function (a) { return a.replace(/ /g,'');},
			}
		}, 
	});

});