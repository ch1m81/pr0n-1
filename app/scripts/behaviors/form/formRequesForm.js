define([
	'App',
    'validate', 
	'mask',
	'fileupload',
	'config/formRules/requestForm.form.rules',
	'config/formRules/validator.rules'
], function (App, validate, mask, fileupload, requestFormRulez, validateRulez) {

    'use strict';

    return Marionette.Behavior.extend({

        ui: {
            'saveRF': '#saveRF',
            'requestForm': '#requestForm',
            'uploadIDProgress': '#uploadIDProgress',
            'fileinputBtn': '.fileinput-button'			
        },

        events: {
            'click @ui.saveRF ': 'saveRF',
        },

        onShow: function () {		
			
			var self = this;
			var tfField = this.view.$el.find('#rfMobileNumber');
			var IDCardField = this.view.$el.find('#rfIDCard');			
			
			tfField.mask('+## ## ### ## ## ZZ ZZ', {translation:  {'Z': {pattern: /[0-9]/, optional: true}}});
			
			IDCardField.fileupload({
				url: 'api/file/upload',				
				formData : {},
				limitMultiFileUploads: 1,
				add: function(e, data) {					
					
					self.resetProgressBar();
					self.ui.fileinputBtn.addClass('disabled');				
					
					var ext = data.originalFiles[0].name.split('.').pop().toLowerCase();
					
					if($.inArray(ext, ['pdf','gif','png','jpg','jpeg']) == -1) {
						self.view.trigger('doc:upload:error', {error: {title: 'Error', message: 'file type is not allowed!'}});
						return false;
					}
						
					if(data.originalFiles[0]['size'] && data.originalFiles[0]['size'] > 2097152) {
						self.view.trigger('doc:upload:error',  {error: {title: 'Error', message: 'file size is to big!'}});	
						return false;						
					}					
				
					data.submit()
						.success(function (result, textStatus, jqXHR) {							
							self.$('.progress-help-block').text(result.originalName);
							self.view.trigger('doc:upload:success', result);	
						})
						.error(function (jqXHR, textStatus, errorThrown) {
							self.view.trigger('doc:upload:error', {error: jqXHR.responseJSON.exception[0]});	
						});
					
				},
				dataType: 'json',
				autoUpload: false,
				progressall: function (e, data) {
					var progress = parseInt(data.loaded / data.total * 100, 10);				
					self.ui.uploadIDProgress.css('width', progress+'%').attr('aria-valuenow', progress).text(progress + '%');
					
				},
				done: function () {
					self.ui.uploadIDProgress.addClass('progress-bar-success');
					self.ui.fileinputBtn.removeClass('disabled');		
				}
			});
		},			
		
		resetProgressBar: function () {													
			this.ui.uploadIDProgress				
				.css('width', '0%')
				.attr('aria-valuenow', 0)
				.text('0%')
				.parent()
				.fadeTo(200, 1);		
		},
		
        saveRF: function () {					

			var self = this;
			
			this.ui.requestForm.validate({
				debug: true,	
				rules: {
					'rfFirstName': {
						required: true,
						minlength: 2
					},
					'rfLastName': {
						required: true,
						minlength: 2
					},
					'rfEmailToChange': {
						required: true,
						emailordomain: true
					},
					'rfEmailToContact': {
						require_from_group: [1, '.contact-group'],
						email: true
					},
					'rfMobileNumber': {
						require_from_group: [1, '.contact-group']
					},
					'rfIDCard': {
						required: function(element) {							
							return _.isEmpty(self.view.model.get('rfIDCard'))
						}
					}
				},
               
				submitHandler: function (form) {
					
					self.ui.saveRF.button('loading');
					
					var arr = self.ui.requestForm.serializeArray();	
										
					var RFFieldRulez = new requestFormRulez().fieldRules();
					
					var	data = _(arr).reduce(function (newObj, field) {
						newObj[field.name] = (RFFieldRulez[field.name])? RFFieldRulez[field.name](field.value) : field.value;						
						return newObj;
					}, {});		
					
					_.extend(data, {faq_ID: self.view.options.formParent.get('faqID')});
					
					self.view.saveIt(data);
				}
				
			});
			
        },
		
        resetBtnState: function () {
            this.ui.saveFaqBtn.button('reset');
        }
    });
});