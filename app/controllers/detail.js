/**
 * @name detail.js
 * @autor
 * @description Detail Controller definition
 */

'use strict';

// Gets the controller dependencies
var region = require('../regions/main'),
	dispatcher = require('../services/dispatcher'),
	books = require('../data/books'),
	DetailView = require('../modules/detail');


// Creates the helper function to render the book detail 
var renderView = function(book) {

	// if the book is set, renders the title and detail
	if (book) {
		dispatcher.command('header:set', [ 'Book : ' + book.get('title'), true ]);
		region.show(new DetailView({ model: book }));
	}

	// if th ebooks does not exists, manage it showing a 404 page
	// NOTE: for the demo we only set a notify, but we may need to add a 404 Page
	else {
		dispatcher.command('notify', [ 'Book not found...' ]);
	}
};

// manages the route for the home page
module.exports = function(id) {

	// Tries to get the current book
	var book = books.get(id);

	// If it exists, it renders directly 
	if (book) {
		renderView(book);
	}

	// if not, it fetches the books first and then loads the viez
	else {
		books.fetch({ success: function() {
			renderView(books.get(id));
		}});
	}
};