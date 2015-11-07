/**
 * @name dispatcher.js
 * @autor
 * @description Creates the main event channel of the application
 * as a mean to communicate between modules without using hard dependencies (loosely coupled)
 * Several other channels can be created for more specific purposes
 *
 * This channel should only be used to create a one-directional information flow between independent modules
 * NOTE: Not to be used for communication between parent-child modules, or between views/models/collections
 */

'use strict';

// Gets the channel reference
var Channel = require('../core/channel');

// Exports the new channel as a module
module.exports = new Channel('dispatcher');