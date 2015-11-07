/** 
 * @name urls.hs 
 * @author
 * @description Url service for the application; servce to have a central reposiutory for all 
 * the external url's used in the application
 */

'use strict';

// Sets the module's closures
var slice = Array.prototype.slice;

// Sets the urls 
var urls = {

	// Books resource url 
	books: 'data/books.json',

	// Book images url 
	boomksImg: 'data/books/img/',

	// Dynamic url, we can pass parameters to construct a link
	book: function(bookId) {
		return 'list/' + bookId;
	}
};

// Sets the url dependencies for the application models
module.exports = function(type) {
	var url = urls[type];
	return url ? (typeof url === 'function' ? url.apply(this, slice.call(arguments, 1)) : url) : undefined;
};