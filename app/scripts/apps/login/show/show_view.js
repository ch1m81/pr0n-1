define([
    'app',
    'text!apps/login/show/templates/login.tpl'
], function(pr0nApp, loginTpl) { 
    pr0nApp.module('LoginApp.Show', function(Show, pr0nApp) {

		
				
// Login ->		
			Show.LoginView = Backbone.Marionette.ItemView.extend({
					template: _.template(loginTpl)
			});
	});

    return pr0nApp.LoginApp.Show;
});
