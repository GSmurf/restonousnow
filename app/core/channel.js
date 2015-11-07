/**
 * @name channel.js
 * @autor
 * @description Creates a channel object, extending from Backbone.Events
 * while adding the reply and command objects 
 */

'use strict';

// Adds the requires for the module
var Backbone = require('Backbone'),	_ = require('underscore');

// Channel constructor to initiaze
var Channel = function(name) {
	this.name = name;
	this._commands = {};
	this._requests = {};
};

// Extends the channel prototype from Backbone events
_.extend(Channel.prototype, Backbone.Events, {

	// Invokes a command
	command: function(name, args) {

		// Gets the commands and if it exists we invoke it
		var command = this._commands[name];
		command && command.callback.apply(command.context, args);
	},

	// Saves the comply function in the commands
	comply: function(name, callback, context) {
		this._commands[name] = {
			callback: callback,
			context: context || this
		};
	},

	// function that unregisters a comply
	uncomply: function(name) {
		if(this._commands[name]) {
			this._commands[name] = null;
		}
	},

	// Makes a request for data or information
	request: function(name, args) {

		// Tries to get the request and return the result
		var request = this._requests[name];
		return request ? request.callback.apply(request.context, args) : null;
	},

	// Replies to a request made 
	reply: function(name, callback, context) {
		this._requests[name] = {
			callback: callback,
			context: context || this
		};
	},

	// function that unregisters a reply
	unreply: function(name) {
		if(this._commands[name]) {
			this._commands[name] = null;
		}
	},

	// creates an "un" method to comply with the requests and commands syntax
	un: function(name, callback, context) {
		this.off(name, callback, context);
	},

	// Clears all the listeners, commands and requests
	clear: function() {
		var me = this, prop;

		// Removes all the requests
		for (prop in me._requests) {
			me._requests[prop] = null;
		}

		// Removes all the commands
		for (prop in me._commands) {
			me._commands[prop] = null;
		}

		// removes all the Backbone Events listeners
		me.off();
	},

	// Destroys the channel
	destroy: function() {
		this.clear();
		this._commands = null;
		this._requests = null;
	}
});


// Exports the channel module
module.exports = Channel;