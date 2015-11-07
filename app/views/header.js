/**
 * @name header.js
 * @autor
 * @description Header view definition
 */

'use strict';

// Adds the requires for the module
var Backbone = require('Backbone'),
	dispatcher = require('../services/dispatcher');

// Exports the header module 
module.exports = Backbone.View.extend({
	
	// Sets the template
	tpl: require('../templates/header.tpl'),

	// Sets the events of the view
	events: {
		'mouseup #header-menu': 'onMenu',
		'mouseup #header-back': 'onBack'
	},

	// Initializes the view
	initialize: function() {
		dispatcher.comply('header:set', this.setHeader, this);
		this.render();
	},

	// Renders the view
	render: function() {
		this.$el.html(this.tpl({ title: 'header' }));
	},

	// Method that sets the title on the header
	setTitle: function(title) {
		this.el.children[2].textContent = title;
	},

	// Method that shows the back button or the menu button
	showBack: function(show) {
		var el = this.el;

		// if the page is the first one, it forces the show to false
		if (history.length === 1) {
			show = false;
		}

		// Swaps the classes
		el.children[show ? 1 : 0].classList.remove('hide');
		el.children[show ? 0 : 1].classList.add('hide');
	},

	// Method fired when the menu button is clicked
	onMenu: function() {
		dispatcher.command('menu:open');
	},

	// Method fired when the back button is clicked
	onBack: function() {
		history.back();
	},

	// Sets the title and back button on the header
	setHeader: function(title, back) {
		this.setTitle(title || '');
		this.showBack(back);
	}
});