// enteties/menu.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define(['App'], function (App) {

    'use strict';

    App.module('Entities.User', function (User) {

	// USER MODEL
			User.UserModel = Backbone.Model.extend({
				defaults: {				
					name: 'guest',
					displayName: 'guest',
					isLoged: false,
				},
				
				idAttribute: 'id'
			});

		// USER COLLECTION
			User.UserCollection = Backbone.Collection.extend({
				model: User.UserModel
			});	

	// PRIVATE 
			var userChannel = Backbone.Radio.channel('user');						
			
// API ->
			var API = { 
			
				getUser: function() {	
					return new User.UserModel();
				},
				
				// proceed with logging-in
				logMeIn: function (credentials) {
					
						var defer = $.Deferred();	

						var userModel = new User.UserModel();
						
						userModel.url =  '../api/public/login';
						
						userModel.fetch({							
								data: JSON.stringify(credentials),							
								type: 'POST',
								indexValue: { isLogging: true },
								isLogging: { isLogging: true },
								success: function (model, data, jqXHR) {									
								
								//defer.resolve(userModel);
									defer.resolve(model);
								},
								
								//there is some error
								error: function (model, jqXHR) {
										defer.reject(jqXHR);
								}
						});
						return defer.promise();
				},
			};

			
// REQUESTS ->
			//Get all models
			userChannel.reply('get:user:new', function(credentials) {  
				return new User.UserModel();
			});
			
			userChannel.reply('log:me:in', function(credentials) {  
				return API.logMeIn(credentials);
			});
				
		});
		return App.Entities.User;
});