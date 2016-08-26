define([
    'app'
], function(pr0nApp) {
    pr0nApp.module('Entities', function(Entities, pr0nApp) {
      
// DEF ->
		
		// MENU MODEL
			Entities.MenuModel = Backbone.Model.extend({
				defaults: {
					name: 'defaultName',
					id: '',
					url: 'defaultUrl',
					icon: 'defaultIcon',
					navigationTrigger: false,
					isSelected: false,
					subMenu: []
				},
				
				idAttribute: 'id',
				
				initialize: function(){					
					
					var subMenu = this.get('subMenu');
					
					if (!_.isEmpty(subMenu)){
						this.set('subMenu', new Entities.MenuCollection(subMenu));								
					}
				} 
				
			});

		// MENU COLLECTION
			Entities.MenuCollection = Backbone.Collection.extend({
				model: Entities.MenuModel
			});
		
		
			
		// PRIVATE 
			var menuChannel = Backbone.Radio.channel('menu');			
			
			var menuData = [{
						'name': 'Home',
						'id': '1',                    
						'url': '#',
						'icon': 'fa-cubes',
						'navigationTrigger': 'home',
						'markThis': 'home',
						'subMenu': []
					},{
						'name': 'Articles',
						'id': '2',                    
						'url': '#',
						'icon': 'fa-history',
						'navigationTrigger': '',
						'markThis': 'articles',
						'subMenu': [{
							'name': 'Grab Articles',
							'id': '3',
							'url': '#',
							'icon': '',
							'navigationTrigger': 'grabArticles',
							'markThis': 'grabArticles'
						}, {
							'name': 'Manage Articles',
							'id': '4',
							'url': '#',
							'icon': '',
							'navigationTrigger': 'manageArticles',
							'markThis': 'manageArticles'
						}]
					}, {
						'name': 'Something',
						'id': '5',                    
						'url': '#',
						'icon': 'fa-history',
						'navigationTrigger': '',
						'markThis': 'something',
						'subMenu': [{
							'name': 'Something 1',
							'id': '6',  
							'url': '#',
							'icon': '',
							'navigationTrigger': 'something1',
							'markThis': 'something1'
						}, {
							'name': 'Something 2',
							'id': '7',                         
							'url': '#',
							'icon': '',
							'navigationTrigger': 'something2',
							'markThis': 'something2'
						}, {
							'name': 'Something 3',
							'id': '8',  
							'url': '#',
							'icon': '',
							'navigationTrigger': 'something3',
							'markThis': 'something3'
						}, {
							'name': 'Something 4',
							'id': '9',  
							'url': '#',
							'icon': '',
							'navigationTrigger': 'something4',
							'markThis': 'something1'
						}]
					}];
					
			
// API ->
			var API = { 
			
				getMenu: function() {	
					return new Entities.MenuCollection(menuData);
				}
			};

			
// REQUESTS ->
			//Get all models
			menuChannel.reply('get:menu', function() {            
				return API.getMenu();
			});
				
		});
		return pr0nApp.Entities;
});
