'use strict';

module.exports = function(register) {

	register('isIn', 'Required a value that is equal to one of ${1}');

	register('isPositive', 'Required a positive number', function(value) {
		return value > 0;
	});

	register('isNegative', 'Required a negative number', function(value) {
		return value < 0;
	});

	register('isNonNegative', 'Required a non negative number', function(value) {
		return value >= 0;
	});

	register('isNonPositive', 'Required a negative number', function(value) {
		return value <= 0;
	});

	register('isLower', 'Required a numerical value lower than ${1}', function(value, bound) {
		return value < bound;
	});

	register('isLowerOrEql', 'Required a numerical value lower or equal to ${1}', function(value, bound) {
		return value <= bound;
	});

	register('isGreater', 'Required a numerical value greater than ${1}', function(value, bound) {
		return value > bound;
	});

	register('isGreaterOrEql', 'Required a numerical value greater or equal to ${1}', function(value, bound) {
		return value >= bound;
	});

	register('isInRange', 'Required a number from range ${1}, ${2}', function(value, min, max) {
		return value < max && value > min;
	});

	register('isInRangeOrEql', 'Required a number from range ${1}, ${2} or equal', function(value, min, max) {
		return value <= max && value >= min;
	});

};
