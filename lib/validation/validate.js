'use strict';

var formatMessage = require('./format-msg');

module.exports = function(value, checks) {
	var orChecks = split(checks, 'or').map(function(orChecks) {
			return split(orChecks, 'and');
		}),
		errors = [],
		valid = orChecks.some(function(andChecks, idx) {
			return andChecks.every(function(checks) {
				var checkErrors = validate(value, checks);
				if (!idx) errors = errors.concat(checkErrors);
				return !checkErrors.length;
			});
		});

	return valid ? [] : errors;
};

function validate(value, checks) {
	return checks.map(function(rule) {
		var validationArgs = [value].concat(rule.args),
			valid = rule.validation.check.apply(null, validationArgs),
			error;
		if (!valid) {
			error = {
				validation: rule.validation.name,
				message: validationMsg(rule.validation.msg, validationArgs),
				value: value
			};
			if (rule.args.length) error.config = rule.args;
		}
		return error;
	}).filter(function(error) {
		return !!error;
	});
}

function split(arr, sep) {
	var current = [],
		splitted = [current];
	arr.forEach(function(item) {
		if (item === sep) {
			current = [];
			splitted.push(current);
		} else {
			current.push(item);
		}
	});
	return splitted;
}

function validationMsg(template, args) {
	var msg = formatMessage(template, args);
	return (msg && msg.length) ? msg : 'Value caused validation error';
}
