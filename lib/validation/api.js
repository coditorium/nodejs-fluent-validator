'use strict';

module.exports = function(checks, validations) {
	var api = {};
	addMarkers(api, ['and', 'or'], checks);
	addValidations(api, validations, checks);
	return api;
};

function addValidations(api, validations, checks) {
	validations.forEach(function(validation) {
		api[validation.name] = function() {
			var args = Array.prototype.slice.call(arguments);
			checks.push({
				validation: validation,
				args: args
			});
			return api;
		};
	});
}

function addMarkers(api, markers, checks) {
	markers.forEach(function(marker) {
		Object.defineProperty(api, marker, {
			get: function() {
				checks.push(marker);
				return api;
			}
		});
	});
}
