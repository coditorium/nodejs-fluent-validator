'use strict';

var buildValidation = require('./validation'),
	registry = require('./registry')();

module.exports = function(value) {
	var ctx = { validations: [] },
		api = {
			// Validating a parameter in a chain
			validate: validate.bind(null, ctx, registry.definitions),
			// Result chcking
			throwOnError: throwOnError.bind(null, ctx),
			check: check.bind(null, ctx.validations),
			hasErrors: hasErrors.bind(null, ctx.validations),
			getErrors: getErrors.bind(null, ctx.validations)
		};
	ctx.api = api;
	registry.definitions.forEach(function(validation) {
		ctx.api[validation.name] = validation.check;
	});
	return arguments.length ? api.validate(value) : api;
};

registry.definitions.forEach(function(validation) {
	module.exports[validation.name] = validation.check;
});
module.exports.add = registry.add;

function validate(ctx, registry, value) {
	var validation = buildValidation(registry, value);
	ctx.validations.push(validation);
	validation.api.validate = ctx.api.validate;
	validation.api.check = ctx.api.check;
	validation.api.throwOnError = ctx.api.throwOnError;
	validation.api.hasErrors = ctx.api.hasErrors;
	validation.api.getErrors = ctx.api.getErrors;
	return validation.api;
}

function check(validations) {
	var errors = getErrors(validations);
	return !errors.length;
}

function throwOnError(ctx) {
	var errors = getErrors(ctx.validations);
	if (errors.length) {
		if (module.exports.throwError) {
			module.exports.throwError(errors);
		} else {
			throw new Error('Validation error: ' + errors.map(function(error) {
				return error.message;
			}).join(', '));
		}
	}
}

function hasErrors(validations) {
	var errors = getErrors(validations);
	return !!errors.length;
}

function getErrors(validations) {
	var errors = [];
	validations.forEach(function(validation) {
		errors = errors.concat(validation.getErrors());
	});
	return errors;
}
