'use strict';

var buildApi = require('./api'),
	validate = require('./validate');

module.exports = function(validations, value) {
	var checks = [], parameterName, ctx = {};
	ctx.api = buildApi(checks, validations);
	ctx.api.param = function(value) {
		parameterName = value;
		return ctx.api;
	};
	ctx.getErrors = function() {
		return validate(value, checks).map(function(error) {
			if (parameterName) error.param = parameterName;
			return error;
		});
	};
	return ctx;
};
