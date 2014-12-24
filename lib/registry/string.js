'use strict';

module.exports = function(register) {
	register('equals', 'Required a value that is equal to ${arg0}');
	register('contains', 'Required a value that contains ${arg0}');
	register('matches', 'Required a value that matches ${arg0}');
	register('isAlpha', 'Required an alphabetical value');
	register('isNumeric', 'Required a numerical value');
	register('isAlphanumeric', 'Required an alphanumerical value');
	register('isLowercase', 'Required a value in lowercase');
	register('isUppercase', 'Required a value in uppercase');
	register('isLength', 'Required a value of given length');
};
