/**
 * @name router.js
 * @autor
 * @description Defines the routes of the application and their actions
 */

'use strict';

// Gets the dependencies
var Backbone = require('backbone');

// Defines the router
var Router = Backbone.Router.extend({});

// Creates the instance of the router and exports it before the modules are loaded
var router = new Router();
module.exports = router;

// Requires the router controllers
var HomeCtrl = require('./controllers/home'),
	ListCtrl = require('./controllers/list'),
	DetailCtrl = require('./controllers/detail'),
	StaticCtrl = require('./controllers/static'),
	FormCtrl = require('./controllers/form');

// Adds the routes
router.route('home', HomeCtrl);
router.route('list', ListCtrl);
router.route('list/:id', DetailCtrl);
router.route('static', StaticCtrl);
router.route('form', FormCtrl);
router.route('', HomeCtrl);