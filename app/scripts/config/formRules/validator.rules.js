/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, _*/

define([
	'App',
	'validate',   
], function (App, validate) {

	'use strict';
	
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
				error.insertAfter(element.parent().sibling());
			} else {				
				element.parent().closest('div').siblings('.containerError').append(error);				
			}
		}
	});

	jQuery.validator.addMethod('emailordomain', function(value, element) {
		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		
		var allowedEmaillAddress = [
			'vtxmail.ch',
			'vtxfree.ch',
			'surfeu.ch',
			'orldonline.ch',
			'freemail.ch',
			'pingnet.ch',
			'datacomm.ch',
			'dtc.ch',
		];
		
		if (re.test(value)) {					
			var domain = value.split('@')[1];					
			return this.optional( element ) || _.includes(allowedEmaillAddress, domain);						
		} 
		
		return false;
	}, 	'Please specify the correct email address');

			
	$.validator.addMethod( 'require_from_group', function( value, element, options ) {
		var $fields = $( options[ 1 ], element.form ),
			$fieldsFirst = $fields.eq( 0 ),
			validator = $fieldsFirst.data( 'valid_req_grp' ) ? $fieldsFirst.data( 'valid_req_grp' ) : $.extend( {}, this ),
			isValid = $fields.filter( function() {
				return validator.elementValue( this );
			} ).length >= options[ 0 ];

		// Store the cloned validator for future validation
		$fieldsFirst.data( 'valid_req_grp', validator );

		// If element isn't being validated, run each require_from_group field's validation rules
		if ( !$( element ).data( 'being_validated' ) ) {
			$fields.data( 'being_validated', true );
			$fields.each( function() {
				validator.element( this );
			} );
			$fields.data( 'being_validated', false );
		}
		return isValid;
	}, $.validator.format( 'Please fill at least {0} of these fields.' ) );
	
	
	

});