/**
 * @name user.js
 * @author
 * @description User model class
 */

'use strict';

// Gets the dependencies for the class
var Backbone = require('backbone');

// Exports the module 
module.exports = Backbone.Model.extend({

	// Validates the attributes
	validate: function(attributes) {

		// verifies that the first and last name were set 
		if (!attributes.firstName || !attributes.lastName) {
			return 'Empty required inputs..';
		}
	}
});