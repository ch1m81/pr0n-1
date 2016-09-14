// apps/admin/rfList/rfListView.js

/*jslint browser: true*/
/*jslint nomen: true*/
/*global $, alert, define, require, google*/

define([
    'App',	
	'bootstrap-toggle',	
    'text!apps/admin/rfList/templates/rfListLayout.html',
    'text!apps/admin/rfList/templates/rfItem.html'
], function (App, bootstrapToggle, rfListLayoutTpl, rfItemTpl) {

    'use strict';

    App.module('AdminApp.RFList.View', function (View) {		

// LAYOUT ->		
        View.RFListLayout = Marionette.LayoutView.extend({
            className: 'row',
			regions: {               
                RFListRegion: '#rf-list-region'
            },
			template: _.template(rfListLayoutTpl),
        });
		
// RF LIST ->		
		View.RFItem = Marionette.ItemView.extend({
			template: _.template(rfItemTpl),			
			className:'panel rf-article',
			ui: {
				'markAsDone': '.markAsDone',//save changes button					
			},		
			
			events: {
				'change @ui.markAsDone' : 'markThisAsDone',
			},
			
			modelEvents: {
				'change:rfSolved': 'rfSolvedChanged' 
			},
						
			onDomRefresh: function () {				
				this.$(this.ui.markAsDone).bootstrapToggle();
			},
			
			templateHelpers: function () {
				
				return {
					sinceCreated: this.model.sinceThen(this.model.get('rfCreatedOn'))
				}
			},
					
			markThisAsDone: function (e) {
				var isChecked = this.ui.markAsDone.prop('checked');
				this.ui.markAsDone.bootstrapToggle('disable')				
				this.trigger('update:rf', this.model, isChecked);				
			},

			rfSolvedChanged: function () {
				console.info('render me pls')
				this.render();
			}
		});

       
		View.RFItems = Marionette.CollectionView.extend({          
			
			className:'panel-group rf-list animated fadeIn',			
			childView: View.RFItem,
			
			toggleCollapsed: function (e) {	
				$(e.target).siblings('.panel-heading').toggleClass('active');	
			}

		});
	
	});
		

    return App.AdminApp.RFList.View;
});