'use strict';

module.exports = function(register) {

	register('isDate', 'Required a valid date value', function(value) {
		return !!toDate(value);
	});

	register('isAfter', 'Required a date that is after ${arg0}', function(value, before) {
		value = toDate(value);
		before = toDate(before);
		return value && value > before;
	});

	register('isAfterOrEql', 'Required a date that is after or equal to ${arg0}', function(value, before) {
		value = toDate(value);
		before = toDate(before);
		return value && value >= before;
	});

	register('isBefore', 'Required a date that is before ${arg0}', function(value, after) {
		value = toDate(value);
		after = toDate(after);
		return value && value < after;
	});

	register('isBeforeOrEql', 'Required a date that is before ${arg0}', function(value, after) {
		value = toDate(value);
		after = toDate(after);
		return value && value <= after;
	});

};

function toDate(date) {
	if (Object.prototype.toString.call(date) === '[object Date]') {
		return date;
	}
	date = Date.parse(date);
	return !isNaN(date) ? new Date(date) : null;
}
