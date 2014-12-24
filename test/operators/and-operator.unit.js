'use strict';

var expect = require('chai').expect,
	validator = requireLib('index');

describe('AND operator:', function() {

	describe('expect to pass', function() {

		it('when both chains are valid', function() {
			var result = validator().validate(1).isInt().and.isPositive().check();
			expect(result).to.be.true;
		});

		it('when the first chain is valid', function() {
			var result = validator().validate(1.5).isFloat().or.isInt().check();
			expect(result).to.be.true;
		});

		it('when the second chain is valid', function() {
			var result = validator().validate(1.5).isInt().or.isFloat().check();
			expect(result).to.be.true;
		});

	});

	describe('expect to fail', function() {

		it('when both chains are invalid', function() {
			var result = validator().validate(-1.5).isInt().and.isPositive().check();
			expect(result).to.be.false;
		});

		it('when second chain is invalid', function() {
			var result = validator().validate(1.5).isFloat().and.isInt().check();
			expect(result).to.be.false;
		});

		it('when first chain is invalid', function() {
			var result = validator().validate(1.5).isInt().and.isFloat().check();
			expect(result).to.be.false;
		});

	});

	describe('should execute', function() {

		it('only the first chain', function() {
			var firstChain = false,
			secondChain = false;
			validator().validate('x').passes(function() {
				firstChain = true;
				return false;
			}).and.passes(function() {
				secondChain = true;
				return true;
			}).check();
			expect(firstChain).to.be.true;
			expect(secondChain).to.be.false;
		});

		it('both chains', function() {
			var firstChain = false,
			secondChain = false;
			validator().validate('x').passes(function() {
				firstChain = true;
				return true;
			}).and.passes(function() {
				secondChain = true;
				return true;
			}).check();
			expect(firstChain).to.be.true;
			expect(secondChain).to.be.true;
		});

	});

});
