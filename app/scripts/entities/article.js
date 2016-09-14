// enteties/menu.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define(['App'], function (App) {

    'use strict';

    App.module('Entities.Article', function (Article) {

//MODELS
		
	// Article MODEL
			Article.ArticleModel = Backbone.Model.extend({
				defaults: {
					title: 'sad article has no title',
					slugUrl: 'sad_article_has_no_title',
					blabla: 'blablabla lab alb ablab alab laba bl'
				},
				
				idAttribute: 'id'
			});

		// Article COLLECTION
			Article.ArticleCollection = Backbone.Collection.extend({
				model: Article.ArticleModel,
				url: '../api/public/articles',
				parse: function (response) {
					if (response.data) {
							return response.data;
					}
					return response;
				}
			});	

// PRIVATE 
			var dataChannel = Backbone.Radio.channel('data');						
			
// API ->
			var API = { 
			
				// get all articles
				getArticles: function() {	
					var articles = new Article.ArticleCollection();
					var defer = $.Deferred();
				
					articles.fetch({				
						success: function(collection, response){
							//defer.resolve(collection, response.total_count);
							//total
							//per_page
							//current_page
							//last_page
							//next_page_url
							//prev_page_url
							//from
							//to
							
							defer.resolve(collection);
						},
						error: function(data, response){
							defer.reject(response);
						}  
					});		
			
					return defer.promise();
				},
			};

			
// REQUESTS ->
			
			//Get all models
			dataChannel.reply('get:article:new', function(credentials) {				
				return new Article.ArticleModel();				
			});
			
			dataChannel.reply('get:articles', function(credentials) {  
				return API.getArticles();
			});
			
		});
		return App.Entities.Article;
});