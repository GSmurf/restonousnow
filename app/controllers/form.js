/**
 * @name form.js
 * @autor
 * @description Form Controller definition
 */

'use strict';

// Gets the controller dependencies
var region = require('../regions/main'),
	dispatcher = require('../services/dispatcher'),
	user = require('../data/user'),
	FormView = require('../modules/form');

// manages the route for the home page
module.exports = function() {
	dispatcher.command('header:set', [ 'Form Page Example' ]);
	region.show(new FormView({ model: user }));
};
