// apps/core/coreView.js

/*jslint browser: true*/
/*jslint this:true */
/*global $, alert, define, require, google, _, Marionette, window*/

define([
    "App", 
		"text!apps/core/templates/menuItemNoSubmenu.html",
		"text!apps/core/templates/menuItemHasSubmenu.html",
		"text!apps/core/templates/userMenu.html"		
], function ( App,menuItemNoSubmenuTpl, menuItemHasSubmenuTpl, userMenuTpl ) {

    "use strict";

    App.module( "CoreApp.View", function ( View ) {

// MENU ->			
			// view for single menu items that NO HAVE submenu
			View.MenuItemNoSubmenu = Backbone.Marionette.ItemView.extend({
				
					template: _.template( menuItemNoSubmenuTpl ),
					
					className: "animated fadeIn",
					
					tagName: "li",
					
					ui: {
						"a": " a"
					},
					
					events: {
						"click @ui.a": "navigateTo"
					},
					
					navigateTo: function ( e ) {
						e.preventDefault();
						if ( this.model.get( "markThis" ) === App.getCurrentRoute() ) return;
						this.trigger( "navigate:to", this.model );
					}
			});
			
			// view for single menu items that HAVE submenu
			View.MenuItemWithSubmenu = Backbone.Marionette.CompositeView.extend({
					
					template: _.template( menuItemHasSubmenuTpl ),
				
					getChildView: function( model){
							return !_.isEmpty( model.get( "subMenu" ) ) ? View.MenuItemWithSubmenu : View.MenuItemNoSubmenu;
					},
					
					childViewContainer: "ul", 
					
					tagName: "li",
					
					className: "dropdown  animated fadeIn", 
					
					initialize: function(){
						this.collection = this.model.get( "subMenu" );							
					}
					
			});
			
			// menu container
			View.MenuCollection = Backbone.Marionette.CollectionView.extend({
					className: "nav navbar-nav",
					
					getChildView: function( model ){						
						return !_.isEmpty( model.get("subMenu") ) ? View.MenuItemWithSubmenu : View.MenuItemNoSubmenu;
					},
					
					tagName:"ul",
					
					initialize: function () {
						this.listenTo( this.collection, "reset", this.render );
					}
			});
			
// USER ->			
			// view for user menu (top right)
			View.UserMenu= Backbone.Marionette.ItemView.extend({
					
					tagName: "ul",
					
					className: "nav navbar-nav navbar-right",
				
					template: _.template( userMenuTpl ),					
					
					modelEvents: {
						"change": "render"
					},
					
					ui: {
						"logOutBtn": ".log-out"
					},
					
					
					events: {
						"click @ui.logOutBtn": "logMeOut"
					},
					
					
					logMeOut: function (e) {
						e.preventDefault();
						this.trigger("user:log:out");
					}
			});
				
	});

    return App.CoreApp.View;
});