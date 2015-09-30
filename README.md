# fluent-validator

[![Travis build status](https://travis-ci.org/coditorium/nodejs-fluent-validator.png?branch=master)](https://travis-ci.org/coditorium/nodejs-fluent-validator)
[![dependencies](https://david-dm.org/coditorium/nodejs-fluent-validator.png)](https://david-dm.org/coditorium/nodejs-fluent-validator)
[![Coverage Status](https://coveralls.io/repos/coditorium/nodejs-fluent-validator/badge.svg)](https://coveralls.io/r/coditorium/nodejs-fluent-validator)

[![NPM info](https://nodei.co/npm/fluent-validator.png?downloads=true)](https://www.npmjs.com/package/fluent-validator)

Fluent validator that enables validation on multiple parameters at once.

## Chained validation

### Express paginated endpoint

Example with express paginated endpoint.
Both query parameters (page and size) must be positive integers or empty values.

``` javascript
var validator = require('fluent-validator');

app.get('/users', function() {
	validator()
		.validate(req.query.page).param('page').isInt().and.isPositive().or.isEmpty()
		.validate(req.query.size).param('size').isInt().and.isPositive().or.isEmpty()
		.throwOnError();

	// query params are valid
});
```

### Separating validation rules

**OR Separator**
``` javascript
// Example: chain1.or.chain2
validator().validate(value).isInt().or.isEmpty();
```

- if `value` passes validation `chain1` than `chain2` is omitted and validation passes successfully.
- if `value` does not pass validation `chain1` than `chain2` is checked.
- if `value` does not any of validation chains then errors are produced from `chain1`.


**AND Separator**

``` javascript
// Example: chain1.and.chain2
validator().validate(value).isInt().and.isPositive().isDivisibleBy(2);
```

- if `value` passes validation `chain1` than `chain2` is checked as well.
- if `value` does not pass validation `chain1` than `chain2` is omitted and errors are produced from `chain1`.

### Result checking

You can react on validation result in multiple ways:
``` javascript
var validation = validator()
	.validate(req.query.page).isInt().and.isPositive().or.isEmpty()
	.validate(req.query.size).isInt().and.isPositive().or.isEmpty();

validation.getErrors(); // Returns array of validation errors
validation.hasErrors(); // Returns true if there are validation errors
validation.check(); // Returns true if there are no validation errors
validation.throwOnError(); // Throws error if there are validation errors.
```

### Simple shortcut

You can shorten validation chain:
``` javascript
var validation1 = validator().validate(req.query.page).isInt().and.isPositive().or.isEmpty();
var validation2 = validator(req.query.page).isInt().and.isPositive().or.isEmpty();

// validation2 is just a shorter version of validation1

```

## Simple validation

Validation without chaining.

``` javascript
var validator = require('fluent-validator');

// isPositive: just executes checks if input > 0
validator.isPositive(1);		// true
validator.isPositive(-1);		// false
validator.isPositive("1");		// true
validator.isPositive("-1");		// false
validator.isPositive(0.1);		// true
validator.isPositive(-0.1);		// false
validator.isPositive("0.1");	// true
validator.isPositive("-0.1");	// false
validator.isPositive({});		// false
validator.isPositive([]);		// false
```

## Configuration

Customizing the validator.

``` javascript
var validator = require('fluent-validator');

// Adding custom validations
validator.add('isEqualTo123', 'Value is not equal to 123', function(value) {
	return value === 123;
});
validator.add('isDivisibleBy', 'Expected ${0} to be divisible by ${1}', function(value, divisibleBy) {
	return value % divisibleBy === 0;
});

// Adding custom error thrower used in validation.throwOnError()
validator.throwError = function(errors) {
	new Error('Validation error. ' + errors.map(function(error) {
		return error.message;
	}));
});
```

## Validations

List of available validations.

### Comparisons

- **isIn(value, arr)** - check if value is in array
- **isPositive(value)** - check if `value > 0`
- **isNegative(value)** - check if `value < 0`
- **isNonNegative(value)** - check if `value >= 0`
- **isNonPositive(value)** - check if `value <= 0`
- **isLower(value, bound)** - check if `value < bound`
- **isLowerOrEql(value, bound)** - check if `value <= bound`
- **isGreater(value, bound)** - check if `value > bound`
- **isGreaterOrEql(value, bound)** - check if `value >= bound`
- **isInRange(value, min, max)** - check if `value > min && value < max`
- **isInRangeOrEql(value, min, max)** - check if `value >= min && value <= max`

### Dates

- **isDate(value)** - check if value is of type `Date` or can be parsed with `Date.parse()`
- **isAfter(value, min)** - check if `value > min`
- **isAfterOrEql(value, min)** - check if `value >= min`
- **isBefore(value, max)** - check if `value < max`
- **isBeforeOrEql(value, max)** - check if `value <= max`

### Numbers

- **isInt(value)** - check if value is an numerical or textual representation of an integer
- **isFloat(value)** - check if value is an numerical or textual representation of a float
- **isNumber(value)** - check if value is an numerical or textual representation of a number
- **isHexadecimal(value)** - check if value is an numerical or textual representation of a hexadecimal number
- **isDivisibleBy(value, x)** - check if value is an numerical or textual representation of a number that is divisible by `x`

### String

- **contains(value, text)** (alias: isIn) - check if value is in text
- **isLength(value, length)** - check if value is of given length
- **matches(value, regexp)** - check if `regexp` matches `value`
- **isAlpha(value)** - check if value is contains only `[a-zA-Z]`
- **isNumeric(value)** - check if value is contains only `[0-9]`
- **isAlphanumeric(value)** - check if value is contains only `[a-zA-Z0-9]`
- **isLowercase(value)** - check if value is lowercased
- **isUppercase(value)** - check if value is uppercased

### Other

- **isAscii(value)** - check if value is contains only ASCII characters
- **isEmail(value)** - email RegExp validation
- **isURL(value)** - URL RegExp validation
- **isIP(value)** - IP RegExp validation
- **isBase64(value)** - Base64 RegExp validation
- **isHexColor(value)** - Base64 RegExp validation
- **isUUID(value)** - UUID RegExp validation
- **isJSON(value)** - UUID RegExp validation
- **isCreditCard(value)** - CreditCard RegExp validation
- **isISBN(value)** - ISBN RegExp validation
- **isMongoObjectId(value)** - MongoObjectId RegExp validation
- **isNull(value)** - checks if `value === null`
- **isNotNull(value)** - checks if `value !== null`
- **isUndefined(value)** - checks if `value === undefined`
- **isNotUndefined(value)** - checks if `value !== undefined`
- **isNullOrUndefined(value)** - checks if `value === undefined || value === null`
- **isNotNullOrUndefined(value)** - checks if `value !== undefined && value !== null`
- **isEmpty(value)** - checks if value is defined and is a non empty array or non empty object or non empty string
- **isNotEmpty(value)** - negation of `isEmpty`

### Custom validation

- **passes(value, check, message)** - checks if `value` passes `check` function. In case of validation error `message` parameter is used.
