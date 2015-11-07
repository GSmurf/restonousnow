/**
 * @name home.js
 * @autor
 * @description Home Controller definition
 */

'use strict';

// Gets the controller dependencies
var region = require('../regions/main'),
	dispatcher = require('../services/dispatcher'),
	HomeView = require('../modules/home');

// manages the route for the home page
module.exports = function() {
	dispatcher.command('header:set', [ 'Home Page' ]);
	region.show(new HomeView());
};
