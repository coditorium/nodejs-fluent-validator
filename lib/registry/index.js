'use strict';

var basicValidator = require('validator');

module.exports = function() {
	var registry = {},
		checks = {},
		definitions = [];

	registry.checks = checks;
	registry.definitions = definitions;
	registry.add = function(name, msg, check) {
		if (checks[name]) throw new Error('There is already a validation check with given name ' + name);
		if (!check && !basicValidator[name]) throw new Error('No validation logic for ' + name);
		checks[name] = check || basicValidator[name].bind(basicValidator);
		definitions.push({
			name: name,
			check: checks[name],
			msg: msg
		});
	};
	initialize(registry.add);
	return registry;
};

function initialize(register) {
	var rules = ['comparison', 'number', 'string', 'dates', 'other'];
	rules.forEach(function(name) {
		var ruleSet = require('./' + name);
		ruleSet(register);
	});
}
