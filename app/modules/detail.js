/**
 * @name detail.js
 * @autor
 * @description Detail module definition
 */

'use strict';

// Adds the requires for the module
var Backbone = require('Backbone'),
	Scrolling = require('../mixins/scroll');

// Exports the header module 
module.exports = Backbone.View.extend({

	// Sets the template
	tpl: require('../templates/detail.tpl'),

	// Sets the module class
	className: 'detail module',

	// Initializes the view
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	// Renders the view
	render: function() {
		this.$el.html(this.tpl({ book: this.model.toJSON() }));
		return this;
	}

// Adds the scroll mixin with the options to override, and exports the module
// when the parentWrap option is true, the module's element (this.el) is not taken as the scroll wrapper, 
// instead, it's parent node is used as the wrapper (in this case the main div)
}).mixin(Scrolling, { parentWrap: true });