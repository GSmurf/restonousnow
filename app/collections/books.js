/**
 * @name books.js
 * @author
 * @description Books collection class
 */

'use strict';

// Gets the dependencies for the class
var Backbone = require('backbone'),
	urls = require('../services/urls'),
	Book = require('../models/book');

// Exports the module 
module.exports = Backbone.Collection.extend({

	// Sets the model of the collection
	model: Book,

	// Sets the url to use in the collection 
	url: urls('books')
});