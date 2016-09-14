
define([
    'App', 'backbone'
], function (App, Backbone) {

    'use strict';

    App.module('Entities.Language', function (LanguageEntities) {

// language Enteties ->
        LanguageEntities.LanguageItem = Backbone.Model.extend({            
            urlRoot: 'api/language/item',
            idAttribute: 'langID',
            defaults: {
                faqCategoryID: '',
                faqCategoryName: ''
            }
        });

       
        LanguageEntities.LanguageItems = Backbone.Collection.extend({
            model: LanguageEntities.LanguageItem,
            url: 'api/language/list'
        });

// language API ->
        var API = {

            // grab all faqs
            getLanguages: function () {
                var languageList = new LanguageEntities.LanguageItems();
                var defer = $.Deferred();

                languageList.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data, response) {
                        defer.resolve({ error: response });
                    }
                });
                return defer.promise();
            }			
        };

// language REQUESTs ->
        
		// return the list of faq-s
        App.reqres.setHandler('language:list', function (options) {
			return API.getLanguages(options);
        });
		
    });
		
		return App.Entities.Language;
});