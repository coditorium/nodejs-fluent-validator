'use strict';

var expect = require('chai').expect,
	validator = require('../index');

describe('Custom validation:', function() {

	var defaultMessage = 'Value caused validation error',
		customMessage = "should be equal to 'PASS'",
		customValidation = function(value) {
			return value === 'PASS';
		};

	describe('should pass', function() {

		it('simple custom validation', function() {
			var validation = validator('PASS').passes(customValidation);
			expect(validation.hasErrors()).to.be.false;
		});

	});

	describe('should fail', function() {

		it('with custom message', function() {
			var validation = validator('X').passes(customValidation, customMessage);
			expect(validation.getErrors()[0].message).to.be.equal(customMessage);
		});

		it('with default message', function() {
			var validation = validator('X').passes(customValidation);
			expect(validation.getErrors()[0].message).to.be.equal(defaultMessage);
		});

	});

});
