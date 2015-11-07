/**
 * @name menu.js
 * @autor
 * @description Menu view definition
 */

'use strict';

// Adds the requires for the module
var Backbone = require('Backbone'),
	router = require('../router'),
	dispatcher = require('../services/dispatcher');

// Exports the header module 
module.exports = Backbone.View.extend({

	// Sets the template
	tpl: require('../templates/menu.tpl'),

	// Initializes the view
	initialize: function() {
		var me = this;

		// Complies to the open and close operations
		dispatcher.comply('menu:open', me.open, me);
		dispatcher.comply('menu:close', me.close, me);
		me.render();
	},

	// Sets the event for the menu module
	events: {
		'mouseup': 'onMenuTap'
	},

	// Fired when the user clicks anywhere in the menu, to close it
	onMenuTap: function(e) {
		e.preventDefault();

		// Closes the menu
		this.close();

		// if a menu item was clicked, it navigates to the module
		var node = e.target, href;
		if (node.classList.contains('menuitem')) {
			href = node.getAttribute('data-href');
			router.navigate(href, { trigger: true });
		}
	},

	// Opens the menu 
	open: function() {
		this.el.classList.add('active');
	},

	// Closes the menu
	close: function() {
		this.el.classList.remove('active');
	},

	// Renders the view
	render: function() {
		this.$el.html(this.tpl());
	}
});