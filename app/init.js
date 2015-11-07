/**
 * @name init.js
 * @autor
 * @description Initializes the application
 */

'use strict';

// Gets the Backbone dependency and sets the jquery object
var Backbone = require('backbone');
Backbone.$ = require('jquery');

// Requires the core classes
require('./core/mixins');

// Requires the application stand-alone services
require('./services/notify');

// Requires the router
require('./router');

// Requires the aplication views (which are always present on the application, no matter what)
var Header = require('./views/header');
var Menu = require('./views/menu');

// Initializes: the application views (which are always present on the application, no matter what)
new Header({ el: '#header' });
new Menu({ el: '#menu' });

// Initializes: the rest of the application
Backbone.history.start();

// Removes the splash once everything is loaded
setTimeout(function() {
	var splash = document.getElementById('splash');
	splash.parentNode.removeChild(splash);
}, 200);