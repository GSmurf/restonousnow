/**
 * @name scroll.js
 * @autor
 * @description Scroll UI comoponent that exentds a backbone view 
 * but uses IScroll for its content
 */

'use strict';

// Adds the requires for the module
var _ = require('underscore'), IScroll = require('iscroll');

// creates the mixin's closure vars
var defaults = {
	scrollX: false,
	scrollY: true,
	lockDirection: true, 
	disableTouch: true,
	disablePointer: true,
	useTransition: false,
	parentWrap: false
};

// Exports the scroll component
module.exports = {

	// initializes the mixin, overrides the scroller function if defined 
	initialize: function(opts) {
		this._scroll = null;
		this.timeout = null;
		this._scrollOpts = _.extend({}, defaults, opts);
	},

	// Adds the render for the mixin, adds the scroll to the view's element
	render: function() {
		var me = this;

		// Sets a timeout to execute after the veiw's el is appended to the DOM
		me.timeout = setTimeout(function() {
			var el = me.el, node = el && me._scrollOpts.parentWrap ? el.parentNode : el;

			// clears the timeout 
			me.timeout = null;

			// if the node was found
			if (node) {

				// verifies if the scroll is not yet created, so it eithers creates it or refreshes it
				if (!me._scroll) {
					me._scroll = new IScroll(node, me._scrollOpts);
				}
				else {
					me._scroll.refresh();
				}
			}
		}, 0);
	},

	// Adds the destroy for the mixin, destroys the scroll instantce 
	destroy: function() {
		var me = this;
		me.timeout && clearTimeout(me.timeout);
		me._scroll && me._scroll.destroy();
		me._scroll = null;
		me._scrollOpts = null;
	}
};