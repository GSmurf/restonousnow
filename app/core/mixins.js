/**
 * @name mixins.js
 * @autor
 * @description Adds a mixin method to the Backbone view's prototye, so we can 
 * create re-usable mixin for the views:
 * Based on: https://github.com/kjbekkelund/writings/blob/master/published/backbone-mixins.md
 */

// Gets the module dependencies
var Backbone = require('backbone'), _ = require('underscore');

// Creates the local vars
var Utils = {};

// Helper method to extend an already existing method
Utils.extendMethod = function(to, from, methodName, opts) {

	// if the method is defined on from 
	if (!_.isUndefined(from[methodName])) {
		var old = to[methodName];

		// we create a new function on to
		to[methodName] = function() {

			// wherein we first call the method which exists on `to`
			var oldReturn = old.apply(this, arguments);

			// and then call the method on `from`
			from[methodName].apply(this, opts ? [opts] : arguments);

			// and then return the expected result,
			// i.e. what the method on `to` returns
			return oldReturn;
		};
	}
};

// Creates the view miximn 
Utils.viewMixin = function(from, opts) {
	var to = this.prototype;

	// we add those methods which exists on `from` but not on `to` to the latter and we do the same for events
	_.defaults(to, from);
	_.defaults(to.events, from.events);

	// we then extend thge "initialize", "render"
	Utils.extendMethod(to, from, 'initialize', opts);
	Utils.extendMethod(to, from, 'render');
	
	// if the destroy method is found on the mixin as it not already copied
	if (to.destroy && from.destroy && to.destroy !== from.destroy) {
		Utils.extendMethod(to, from, 'destroy');
	}

	// returns the object to enable chaining 
	return this;
};

// Adds the mixin to the backbone view prototype
Backbone.View.mixin = Utils.viewMixin;