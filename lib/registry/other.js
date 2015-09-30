'use strict';

module.exports = function(register) {

	register('isAscii', 'Required a value composed of ASCII characters');
	register('isEmail', 'Required a valid email address');
	register('isURL', 'Required a valid URL address');
	register('isIP', 'Required a valid IP address');
	register('isBase64', 'Required a base64 encoded value');
	register('isHexColor', 'Required a value that is a hexadecimal color');
	register('isNull', 'Required a null value');
	register('isUUID', 'Required a valid UUID value');
	register('isCreditCard', 'Required a valid credit card number');
	register('isISBN', 'Required a valid ISBN number');
	register('isJSON', 'Required a valid JSON document');

	register('isMongoObjectId', 'Required an object id value', function(value) {
		// Source: https://github.com/mongodb/js-bson/blob/master/lib/bson/objectid.js
		if (value == null) return false;
		if (value != null && 'number' !== typeof value && (value.length !== 12 && value.length !== 24)) return false;
		if (typeof value === 'string' && value.length === 24) return new RegExp("^[0-9a-fA-F]{24}$").test(value);
		return true;
	});

	register('isUndefined', 'Required undefined value', function(value) {
		return value === undefined;
	});

	register('isNullOrUndefined', 'Required null or undefined value', function(value) {
		return value === undefined || value === null;
	});

	register('isNotNull', 'Required value other than null', function(value) {
		return value !== null;
	});

	register('isNotUndefined', 'Required value other than undefined', function(value) {
		return value !== undefined;
	});

	register('isNotNullOrUndefined', 'Required value other than null or undefined', function(value) {
		return !(value === undefined || value === null);
	});

	register('isEmpty', 'Required an empty value', function(value) {
		return isEmpty(value);
	});

	register('isNotEmpty', 'Required a non empty value', function(value) {
		return !isEmpty(value);
	});

	register('passes', '${2}', function(value, check/*, msg*/) {
		return check(value);
	});

};

function isEmpty(value) {
	return value === undefined || value === null || value === '' ||
		(Array.isArray(value) && value.length === 0) ||
		(typeof value === 'object' && Object.keys(value).length === 0);
}
