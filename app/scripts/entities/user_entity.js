define([
    'app'
], function(pr0nApp) {
    pr0nApp.module('Entities', function(Entities, pr0nApp) {
     
		'use strict' 
		 
// DEF ->
		
		// USER MODEL
			Entities.UserModel = Backbone.Model.extend({
				defaults: {
					isLoggedIn: false,
					userFName: '',
					userLName: '',
					userID: ''
				},
				
				idAttribute: 'userID'
			});

		// USER COLLECTION
			Entities.UserCollection = Backbone.Collection.extend({
				model: Entities.UserModel
			});
		
		
			
		// PRIVATE 
			var userChannel = Backbone.Radio.channel('user');	
			
// API ->
			var API = { 
			
				getNewUser: function() {						
					return new Entities.UserModel();
				}
			};
			
// REQUESTS ->
			//get NEW user (for login)
			userChannel.reply('get:user:new', function() {			
				return API.getNewUser();
			});
				
		});
		return pr0nApp.Entities;
});
