/**
 * @name book.js
 * @author
 * @description Book model class
 */

'use strict';

// Gets the dependencies for the class
var Backbone = require('backbone'),
	urls = require('../services/urls');

// Exports the module 
module.exports = Backbone.Model.extend({
	defaults: {
		'baseUrl': urls('boomksImg')
	}
});