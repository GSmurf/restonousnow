/**
 * @name form.js
 * @autor
 * @description Form module definition
 */

'use strict';

// Adds the requires for the module
var Backbone = require('Backbone'),
	dispatcher = require('../services/dispatcher');

// Exports the header module 
module.exports = Backbone.View.extend({

	// Sets the template
	tpl: require('../templates/form.tpl'),

	// Sets the module class
	className: 'form module',

	// Set the events for the view
	events: {
		'submit .user' : 'onSubmit'
	},

	// Initializes the view
	initialize: function() {
		var me = this;
		me.listenTo(me.model, 'change', me.render);
		me.listenTo(me.model, 'invalid', me.invalid);
	},

	// Renders the view
	render: function() {
		this.$el.html(this.tpl({ user: this.model.toJSON() }));
		return this;
	},

	// When the view is submited
	onSubmit: function(e) {
		var me = this;
		e.preventDefault();

		// Sets the model with the form data 
		me.model.set({
			'firstName' : me.$el.find('#firstName').val(),
			'lastName' : me.$el.find('#lastName').val(),
			'gender' : me.$el.find('#gender').val(),
			'writer' : me.$el.find('#writer').is(':checked')
		}, { silent: true });

		// Verifies if the model is valid to save it 
		// NOTE: Normally here is when the form is sent to the server, 
		// a validation should be made with the response from the server "save" operation
		if (me.model.isValid()) {
			// me.model.save();
			dispatcher.command('notify:success', [ 'User form correctly saved..' ]);
		}
	},

	// fired when the form is invalid
	invalid: function() {
		dispatcher.command('notify:error', [ 'Incorrect form: ' + this.model.validationError ]);
	},
});