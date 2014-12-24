'use strict';

var basicValidator = require('validator');

module.exports = function(register) {

	register('isInt', 'Required a valid integer value');

	register('isFloat', 'Required a valid float value');

	register('isNumber', 'Required a number', function(value) {
		return basicValidator.isFloat(value);
	});

	register('isHexadecimal', 'Required a hexadecimal encoded value', function(value) {
		return basicValidator.isHexadecimal(value);
	});

	register('isDivisibleBy', 'Required a numerical value that is divisible by ${arg0}', function(value) {
		return basicValidator.isDivisibleBy(value);
	});
};
