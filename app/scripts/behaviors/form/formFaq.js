define([
	'App',
    'validate',
	'config/formRules/faq.form.rules'
], function (App, validate, faqFormRulez) {

    'use strict';

    return Marionette.Behavior.extend({

        ui: {
            'saveFaqBtn': '#saveFaq',
            'faqForm': '#faqForm'
        },

        events: {
            'click @ui.saveFaqBtn ': 'saveFaq',
        },

        initialize: function () {
         
			$.validator.setDefaults({
				highlight: function (element) {
					$(element).closest('.form-group').addClass('has-error');
				},
				unhighlight: function (element) {
					$(element).closest('.form-group').removeClass('has-error');
				},
				errorElement: 'span',
				errorClass: 'help-block',
				errorPlacement: function (error, element) {
					if (element.parent('.input-group').length) {
						error.insertAfter(element.parent());
					} else {
						error.insertAfter(element);
					}
				}
			});

        },

        saveFaq: function () {					
			
			var self = this;
			
			this.ui.faqForm.validate({
				debug: true,	
				rules: {
					'faqTitle': {
						required: true,
						minlength: 5
					},
					'faqText': {
						required: true
					}
				},
               
				submitHandler: function (form) {
					
					self.ui.saveFaqBtn.button('loading');
					
					var arr = self.ui.faqForm.serializeArray();	
										
					var faqFieldRulez = new faqFormRulez().fieldRules();
					
					var	data = _(arr).reduce(function (newObj, field) {
						newObj[field.name] = (faqFieldRulez[field.name])? faqFieldRulez[field.name](field.value) : field.value;						
						return newObj;
					}, {});					
					
					var faqPublishedStatus = (self.ui.faqPublished.prop('checked'))? '1':'0';					
					_.extend(data, {faqPublished:faqPublishedStatus});
					
					self.view.saveIt(data);
				}
				
			});
			
        },
		
        resetBtnState: function () {
            this.ui.saveFaqBtn.button('reset');
        }
    });
});