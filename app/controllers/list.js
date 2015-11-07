/**
 * @name list.js
 * @autor
 * @description List Controller definition
 */

'use strict';

// Gets the controller dependencies
var region = require('../regions/main'),
	dispatcher = require('../services/dispatcher'),
	books = require('../data/books'),
	ListView = require('../modules/list');

// manages the route for the home page
module.exports = function() {

	// Sets the header title and the view in the region 
	dispatcher.command('header:set', [ 'List Example: books' ]);
	region.show(new ListView({ collection: books }));

	// if the collection is empty it fills it once
	if (books.isEmpty()) {
		books.fetch({ reset : true });
	}
};