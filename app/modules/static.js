/**
 * @name static.js
 * @autor
 * @description Static module definition
 */

'use strict';

// Adds the requires for the module
var Backbone = require('Backbone'),
	dispatcher = require('../services/dispatcher');

// Exports the header module 
module.exports = Backbone.View.extend({
	
	// Sets the template
	tpl: require('../templates/static.tpl'),

	// Sets the module class
	className: 'static module',

	// Initializes the view
	initialize: function() {
	},

	// Events of the viez
	events: {
		'click .modal': 'onModal'
	},

	// Renders the view
	render: function() {
		this.$el.html(this.tpl());
		return this;
	},

	// Opens the modal service
	onModal: function() {
		dispatcher.command('notify', [ 'Notification sent to service..' ]);
	}
});