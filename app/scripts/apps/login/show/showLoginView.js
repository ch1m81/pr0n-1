
define([
    'App',			
    'text!apps/login/show/templates/login.html'
], function (App, loginTpl) {

    'use strict';

	App.module('LoginApp.Show.View', function (View) {		

// Login ->		
		View.LoginView = Backbone.Marionette.ItemView.extend({
				className: 'animated  fadeIn',
				template: _.template(loginTpl),
				ui: {
					'submitBtn': '#submit',
					'email': '#email',
					'password': '#password'
				},

				events: {
					'click @ui.submitBtn': 'submitUserData'
				},

				submitUserData: function (e) {
					e.preventDefault();					
					this.trigger('pass:user:credentials', this.ui.email.val(), this.ui.password.val());
				},

				resetLoadingBtn: function () {
						this.ui.submitBtn.button('reset');
				}
		});
	});
		

    return App.LoginApp.Show.View;
});

