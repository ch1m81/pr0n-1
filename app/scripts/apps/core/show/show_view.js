define([
    'app',
    'text!apps/core/show/templates/menuItemNoSubmenu.tpl',
    'text!apps/core/show/templates/menuItemHasSubmenu.tpl'
], function(pr0nApp, menuItemNoSubmenuTpl, menuItemHasSubmenuTpl) { 
    pr0nApp.module('CoreApp.Show', function(Show, pr0nApp, Backbone, Marionette, $, _) {

		
				
// MENU ->			
			// view for single menu items that NO HAVE submenu
			Show.MenuItemNoSubmenu = Backbone.Marionette.ItemView.extend({
					template: _.template(menuItemNoSubmenuTpl),
					tagName: 'li'
			});
			
			// view for single menu items that HAVE submenu
			Show.MenuItemWithSubmenu = Backbone.Marionette.CompositeView.extend({
					template: _.template(menuItemHasSubmenuTpl),
					getChildView: function(model){
							return !_.isEmpty(model.get('subMenu')) ? Show.MenuItemWithSubmenu : Show.MenuItemNoSubmenu;
					},
					childViewContainer: 'ul', 
					tagName: 'li',
					className: 'dropdown',					
					initialize: function(){
							this.collection = this.model.get('subMenu');							
					}
					
			});
			
			// menu container
			Show.MenuCollection = Backbone.Marionette.CollectionView.extend({
					className: 'nav navbar-nav animated slideInDown',
					getChildView: function(model){						
						return !_.isEmpty(model.get('subMenu')) ? Show.MenuItemWithSubmenu : Show.MenuItemNoSubmenu;
					},
					tagName:'ul'
			});
				
				
				
				
				
	});

    return pr0nApp.CoreApp.Show;
});
