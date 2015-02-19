'use strict';

var expect = require('chai').expect,
	validator = require('../index');

describe('Result checking:', function() {

	describe('should pass validation without errors', function() {

		var validation = validator(1).isInt();

		it(' - hasErrors', function() {
			expect(validation.hasErrors()).to.be.false;
		});

		it(' - check', function() {
			expect(validation.check()).to.be.true;
		});

		it(' - getErrors', function() {
			expect(validation.getErrors()).to.be.eql([]);
		});

		it(' - throwOnErrors', function() {
			expect(function() {
				validation.throwOnError();
			}).to.not.throw();
		});

	});

	describe('should pass validation with an error', function() {

		var validation = validator('x').isInt();

		it(' - hasErrors', function() {
			expect(validation.hasErrors()).to.be.true;
		});

		it(' - check', function() {
			expect(validation.check()).to.be.false;
		});

		it(' - getErrors', function() {
			expect(validation.getErrors()).to.be.eql([{
				message: "Required a valid integer value",
				validation: "isInt",
				value: "x"
			}]);
		});

		it(' - throwOnErrors', function() {
			expect(function() {
				validation.throwOnError();
			}).to.throw('Validation error: Required a valid integer value');
		});

	});

	describe('should use custom error throwing mechanism', function() {

		before(function() {
			validator.throwError = function(errors) {
				throw new Error('Custom error. Errors: ' + errors.length);
			};
		});

		after(function() {
			delete validator.throwError;
		});

		it('on throwOnErrors', function() {
			expect(function() {
				validator('x').isInt().throwOnError();
			}).to.throw('Custom error. Errors: 1');
		});

	});

	it('should pass validation check arguments in error', function() {
		var validation = validator('x').isIn(['a', 'b', 'c']);
		expect(validation.getErrors()).to.be.eql([{
			message: "Required a value that is equal to one of a,b,c",
			validation: "isIn",
			value: "x",
			config: [['a', 'b', 'c']]
		}]);
	});

});
