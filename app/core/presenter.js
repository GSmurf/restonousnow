/**
 * @name presenter
 * @autor 
 * @description generic presenter object for Backbone.Model
 * Based on: http://pragmatic-backbone.com/
 */

'use strict';

// Sets the requires for the module
var _ = require('underscore');

// presenter = new ModelPresenter({model: model});
var ModelPresenter = function(options) {
	this.model = options && options.model;
};

// Pass a template object and it’ll output it with the presenter’s model attributes.
ModelPresenter.prototype.partial = function(template) {
	return template(_.extend(this, this.model.attributes));
};

// Exports the presenter object
module.exports = ModelPresenter;