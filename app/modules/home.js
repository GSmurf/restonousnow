/**
 * @name home.js
 * @autor
 * @description Main module definition
 */

'use strict';

// Adds the requires for the module
var Backbone = require('Backbone'),
	Scrolling = require('../mixins/scroll');

// Exports the header module 
module.exports = Backbone.View.extend({
	
	// Sets the template
	tpl: require('../templates/home.tpl'),

	// Sets the class for the Module
	// When we add the "scrollwrap" class to the module, we indicate that t
	className: 'home module',

	// Initializes the module
	initialize: function() {
	},

	// Renders the view
	render: function() {
		this.$el.html(this.tpl());
		return this;
	}

// Adds the scroll mixin with the options to override, and exports the module
// when the parentWrap option is true, the module's element (this.el) is not taken as the scroll wrapper, 
// instead, it's parent node is used as the wrapper (in this case the main div)
}).mixin(Scrolling, { parentWrap: true });