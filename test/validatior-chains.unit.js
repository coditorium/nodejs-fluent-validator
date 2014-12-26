'use strict';

var expect = require('chai').expect,
	validator = require('../index');

describe('Validation chains:', function() {

	describe('expect to pass', function() {

		it('a single validation from validator object', function() {
			var result = validator.isInt('1');
			expect(result).to.be.true;
		});

		it('a chained validation', function() {
			var result = validator().validate('1').isInt().check();
			expect(result).to.be.true;
		});

		it('a chained validation of two values', function() {
			var result = validator()
				.validate('1').isInt()
				.validate('2').isInt()
				.check();
			expect(result).to.be.true;
		});

		it('a short chained validation', function() {
			var result = validator('1').isInt().check();
			expect(result).to.be.true;
		});

		it('a long validation chain', function() {
			var result = validator('1').isInt().isPositive().check();
			expect(result).to.be.true;
		});

		it('a long validation chain of two values', function() {
			var result = validator()
				.validate('1').isInt().isPositive()
				.validate('-0.1').isFloat().isNegative()
				.check();
			expect(result).to.be.true;
		});

	});

	describe('expect to not pass', function() {

		it('a single validation from validator object', function() {
			var result = validator.isInt('x');
			expect(result).to.be.false;
		});

		it('a chained validation', function() {
			var result = validator().validate('x').isInt().check();
			expect(result).to.be.false;
		});

		it('a short chained validation', function() {
			var result = validator('x').isInt().check();
			expect(result).to.be.false;
		});

		it('a chained validation of two values with first value causing error', function() {
			var errors = validator()
				.validate('x').isInt()
				.validate('2').isInt()
				.getErrors();
			expect(errors.length).to.be.equal(1);
			expect(errors[0].value).to.be.equal('x');
		});

		it('a chained validation of two values with second value causing error', function() {
			var errors = validator()
				.validate('1').isInt()
				.validate('x').isInt()
				.getErrors();
			expect(errors.length).to.be.equal(1);
			expect(errors[0].value).to.be.equal('x');
		});

		it('a chained validation of two values with both values causing error', function() {
			var errors = validator()
				.validate('x').isInt()
				.validate('y').isInt()
				.getErrors();
			expect(errors.length).to.be.equal(2);
			expect(errors[0].value).to.be.equal('x');
			expect(errors[1].value).to.be.equal('y');
		});

		describe('a long validation chain', function() {

			it('with first check invalid', function() {
				var errors = validator('0.1').isInt().isPositive().getErrors();
				expect(errors.length).to.be.equal(1);
				expect(errors[0].validation).to.be.equal('isInt');
			});

			it('with second check invalid', function() {
				var errors = validator().validate('1').isInt().isNegative().getErrors();
				expect(errors.length).to.be.equal(1);
				expect(errors[0].validation).to.be.equal('isNegative');
			});

			it('with both checks invalid', function() {
				var errors = validator().validate('0.1').isInt().isNegative().getErrors();
				expect(errors.length).to.be.equal(2);
				expect(errors[0].validation).to.be.equal('isInt');
				expect(errors[1].validation).to.be.equal('isNegative');
			});

		});

		describe('a long validation chain of two values', function() {

			it('with first value invalid', function() {
				var errors = validator()
					.validate('0.1').isInt().isPositive()
					.validate('-0.1').isFloat().isNegative()
					.getErrors();
				expect(errors.length).to.be.equal(1);
				expect(errors[0].validation).to.be.equal('isInt');
				expect(errors[0].value).to.be.equal('0.1');
			});

			it('with second value invalid', function() {
				var errors = validator()
					.validate('1').isInt().isPositive()
					.validate('-0.1').isFloat().isPositive()
					.getErrors();
				expect(errors.length).to.be.equal(1);
				expect(errors[0].validation).to.be.equal('isPositive');
				expect(errors[0].value).to.be.equal('-0.1');
			});

			it('with both values invalid', function() {
				var errors = validator()
					.validate('0.1').isInt().isNegative()
					.validate('-0.1').isInt().isPositive()
					.getErrors();
				expect(errors.length).to.be.equal(4);
				expect(errors[0].validation).to.be.equal('isInt');
				expect(errors[0].value).to.be.equal('0.1');
				expect(errors[1].validation).to.be.equal('isNegative');
				expect(errors[1].value).to.be.equal('0.1');
				expect(errors[2].validation).to.be.equal('isInt');
				expect(errors[2].value).to.be.equal('-0.1');
				expect(errors[3].validation).to.be.equal('isPositive');
				expect(errors[3].value).to.be.equal('-0.1');
			});

		});

	});

});
