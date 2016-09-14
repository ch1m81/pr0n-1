define([
    'App',
		//"behaviors/form/formRequesForm",	
    'text!apps/articles/show/template/articlesLayout.html',
    'text!apps/articles/show/template/articleItem.html'
], function (App, /*formRequesBehavior, */ articlesLayoutTpl, articleItemTpl) {

    'use strict';

    App.module('ArticlesApp.AriclesShow.View', function (View) {		

// FAQ Single form ->		
			View.AriclesLayout = Marionette.LayoutView.extend({
				
				//className: "row animated fadeIn",
				className: 'row',
				
				template: _.template(articlesLayoutTpl),
				
				 regions: {
					topPanel: '#topPanel',
					articlesList: '#articlesList'
				}
				
				/*templateHelpers: function(){				
					return {
						faqTitle: this.options.formParent.get("faqTitle"),
						faqContent: this.options.formParent.get("faqContent")
					}
					
				},*/
				
				/*events: {
					"click #cancel": "goBack"
				},*/
				
				/*behaviors: {
						validateForm: {
								behaviorClass: formRequesBehavior
						}
				},*/
							
				/*saveIt: function (data) {
					this.trigger("rf:save", data);
				},*/
			});
			
		// Articles List Model
			View.ArticlesListModel = Marionette.ItemView.extend({				
				template: _.template(articleItemTpl),
			});
		
		// Articles List Collection
			View.ArticlesListCollection = Marionette.CollectionView.extend({				
				className: 'animated fadeIn',
				childView: View.ArticlesListModel
			});
		});
    return App.ArticlesApp.AriclesShow.View;
});