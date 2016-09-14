// enteties/menu.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define( ['App'], function ( App ) {

    'use strict';

    App.module( 'menuEntities', function ( menuEntities ) {

	// MENU MODEL
			menuEntities.MenuModel = Backbone.Model.extend({
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
					
					var subMenu = this.get( 'subMenu' );
					
					if (!_.isEmpty( subMenu )){
						this.set( 'subMenu', new menuEntities.MenuCollection( subMenu ));								
					}
				}
								
			});

		// MENU COLLECTION
			menuEntities.MenuCollection = Backbone.Collection.extend({
				
				model: menuEntities.MenuModel,
				
				// create menu out of array by filtering the "access" attribute of the menu-item
				createMenu: function ( options ) {
					
					var isLoggedIn = ( options ) ? options.isLoggedIn : false;
					
		console.log('isLoggedIn', isLoggedIn)
					
					var menuItems = _( this.getMenuData() ).reject( function( item ){ 
						
						if ( item.subMenu && !_.isEmpty( item.subMenu )) {
							
							var submenuItems = _( item.subMenu ).reject( function( subItem ){ 
								return subItem.access !== isLoggedIn;
							});
							
							item.subMenu = submenuItems;	
							
							return item.subMenu.length === 0;
						
						} else {			
						
							return item.access !== isLoggedIn;
						}
						
					});
					
					// reset collection with returned menu items
					this.reset( menuItems );
	
				},
				
				getMenuData: function () {
					return [{
						'name': 'Login',
						'id': '1',                    
						'url': '#',
						'icon': 'fa-cubes',
						'navigationTrigger': 'login:show',
						'markThis': 'login',
						'subMenu': [],
						'access':  false 
					},{
						'name': 'Home',
						'id': '2',                    
						'url': '#',
						'icon': 'fa-cubes',
						'navigationTrigger': 'home',
						'markThis': 'home',
						'subMenu': [],
						'access': true
					},{
						'name': 'Articles',
						'id': '3',                    
						'url': '#',
						'icon': 'fa-history',
						'navigationTrigger': 'articles:show',
						'markThis': 'articles',
						'subMenu': [],
						'access': true
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
							'markThis': 'something1',
							'access': true
						}, {
							'name': 'Something 2',
							'id': '7',                         
							'url': '#',
							'icon': '',
							'navigationTrigger': 'something2',
							'markThis': 'something2',
							'access': true
						}, {
							'name': 'Something 3',
							'id': '8',  
							'url': '#',
							'icon': '',
							'navigationTrigger': 'something3',
							'markThis': 'something3',
							'access': true
						}, {
							'name': 'Something 4',
							'id': '9',  
							'url': '#',
							'icon': '',
							'navigationTrigger': 'something4',
							'markThis': 'something1',
							'access': true
						}]
					}];
				}
			});
		
			
		// PRIVATE 
			var menuChannel = Backbone.Radio.channel( 'menu' );	
			
// API ->
			var API = { 			
				getMenu: function( options ) {						
					
					// init new menu (collection)
					var menuCollection = new menuEntities.MenuCollection();
						
					// create the menu according to user status
					menuCollection.createMenu( options );
						
					// return menu (collection)
					return menuCollection;
				}
			};

			
// REQUESTS ->
			//Get all models
			menuChannel.reply( 'get:menu', function( options ) {            
				return API.getMenu( options );
			});
				
		});
		return App.menuEntities;
});