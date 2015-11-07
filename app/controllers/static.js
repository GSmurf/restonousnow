/**
 * @name static.js
 * @autor
 * @description Static Controller definition
 */

'use strict';

// Gets the controller dependencies
var region = require('../regions/main'),
	dispatcher = require('../services/dispatcher'),
	StaticView = require('../modules/static');

// manages the route for the home page
module.exports = function() {
	dispatcher.command('header:set', [ 'Static Page Example' ]);
	region.show(new StaticView());
};
