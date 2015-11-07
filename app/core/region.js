/**
 * @name region.js
 * @autor
 * @description Region component to be re-used trhough the application to create a regions in which 
 * the application's modules are loaded
 */

'use strict';

// Adds the requires for the module
var Region = function(el) {
	this.el = el;
	this.current = null;
};

// Sets the Slider prototype
Region.prototype = {

	// shows a view in the region 
	show: function(view) {
		var me = this;

		// if the current view exists, it destroys it
		me.destroyView();

		// Creates the new view
		me.current = view;

		// renders the view on the main element
		this.el.appendChild(view.render().el);
	},

	// Verifies if the region currently contains aview
	hasView: function() {
		return this.current ? true : false;
	},
	
	// Destroys the current view in the region 
	destroyView: function() {
		var me = this, view = me.current; 

		// if the current view exists, it destroys it
		if (view) {

			// calls the destroy function if available
			view.destroy && view.destroy();

			// Undelegates the events and removes the view
			view.undelegateEvents();
			view.remove();
			me.current = null;
		}
	},

	// empties the current region 
	empty: function() {
		this.destroyView();
	},

	// Destroys the regin instance
	destroy: function() {
		this.destroyView();
		this.el = null;
		this.current = null;
	},

};

// Exports the header module 
module.exports = Region;