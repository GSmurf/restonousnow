/**
 * @name main.js
 * @author
 * @description Region for the main module view of the application 
 */

'use strict';

// Gets the dependencies of the module
var Region = require('../core/region');

// Exports a new region with 
module.exports = new Region(document.getElementById('main'));