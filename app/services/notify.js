/** 
 * @name notify 
 * @author
 * @description Notify service for the application
 */

'use strict';

// Gets the module references
var dispatcher = require('./dispatcher');

// Sets the local variables
var notification, timeout, modal;

// Sets the service object 
var modal = {

	// creaates a notification object 
	notify: function(text, cls) {

		// Creates the modal div if it doesn't exists
		if (!notification) {
			notification = document.createElement('div');
			notification.id = 'notify';
			notification.className = 'notify notify-' + cls;
			notification.textContent = text;
			document.body.appendChild(notification);
		}

		// If the text is already set,sets the new name and class
		else {
			notification.className = 'modal notify notify-' + cls;
			notification.textContent = text;
		}

		// Sets the animation 
		setTimeout(function() {

			// Sets the active class
			notification.classList.add('show');

			// Clear sthe previuos timeout
			timeout && clearTimeout(timeout);
			timeout = null;

			// then it sets a nex timeout to take off the notification
			timeout = setTimeout(function() {
				notification.parentNode.removeChild(notification);
				notification = null;
				timeout = null;
			}, 2000);
		}, 0);
	},

	// Sets an info notification 
	info: function(msg) {
		this.notify(msg, 'info');
	},

	// Sets a success notification 
	success: function(msg) {
		this.notify(msg, 'success');
	}, 

	// Sets an error notification 
	error: function(msg) {
		this.notify(msg, 'danger');
	},

	// Sets a warning notification 
	warning: function(msg) {
		this.notify(msg, 'warning');
	} 
};

// Adds the comply listeners for the service
dispatcher.comply('notify', modal.info, modal);
dispatcher.comply('notify:success', modal.success, modal);
dispatcher.comply('notify:error', modal.error, modal);
dispatcher.comply('notify:warning', modal.warning, modal);

// Exports the modal service
module.exports = modal;