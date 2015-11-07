/**
 * @name list.js
 * @autor
 * @description List module definition
 */

'use strict';

// Adds the requires for the module
var Backbone = require('Backbone'),
	router = require('../router'),
	urls = require('../services/urls'),
	Scrolling = require('../mixins/scroll');

// Exports the header module 
module.exports = Backbone.View.extend({

	// Sets the template
	tpl: require('../templates/list.tpl'),

	// Sets the module class
	className: 'booklist list',

	// Sets the tag for the list
	tagName: 'ul',

	// Gets the events for the view 
	events: {
		'tap li' : 'onTap'
	},

	// Initializes the view
	initialize: function() {
		var me = this;

		// Adds the listener to the collection 
		me.listenTo(me.collection, 'reset', me.render);

		// NOTE: In a real application, we need to add listeners to 
		// the 'add' and 'remove' collection events, in order to keep
		//  the list updated every time that the collection is fetched
		//me.listenTo(me.collection, 'add', me.add);
		//me.listenTo(me.collection, 'remove', me.remove);
	},

	// Renders the view
	render: function() {
		this.$el.html(this.tpl({ books: this.collection.toJSON() }));
		return this;
	},

	// Function fired when a book is tapped
	onTap: function(e) {
		// Gets the node and it's id
		var target = e.target,
			node = target.classList.contains('book') ? target : target.parentNode, 
			id = node && node.getAttribute('data-id');

		// Navigates to the view if the id was found
		if (id) {
			router.navigate(urls('book', id), { trigger: true });
		}
	}

// Adds the scroll mixin with the options to override, and exports the module
// when the parentWrap option is true, the module's element (this.el) is not taken as the scroll wrapper, 
// instead, it's parent node is used as the wrapper (in this case the main div)
}).mixin(Scrolling, { parentWrap: true, click: false, tap: true });