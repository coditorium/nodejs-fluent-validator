'use strict';

var expect = require('chai').expect,
	checks = requireLib('registry')().checks;

describe('Number validation checks:', function() {

	describe('int validation', function() {

		it('should pass', function() {
			var result = checks.isInt(1);
			expect(result).to.be.true;
		});

		it('should pass with string', function() {
			var result = checks.isInt('' + 1);
			expect(result).to.be.true;
		});

		it('should not pass with a random string', function() {
			var result = checks.isInt('XXX');
			expect(result).to.be.false;
		});

		it('should not pass with a float string', function() {
			var result = checks.isInt('1.5');
			expect(result).to.be.false;
		});

		it('should not pass with a float', function() {
			var result = checks.isInt(1.5);
			expect(result).to.be.false;
		});

	});

	describe('float validation', function() {

		it('should pass with int', function() {
			var result = checks.isFloat(1);
			expect(result).to.be.true;
		});

		it('should pass with int string', function() {
			var result = checks.isFloat('' + 1);
			expect(result).to.be.true;
		});

		it('should pass with float', function() {
			var result = checks.isFloat(1.5);
			expect(result).to.be.true;
		});

		it('should pass with float string', function() {
			var result = checks.isFloat('' + 1.5);
			expect(result).to.be.true;
		});

		it('should not pass with a random string', function() {
			var result = checks.isFloat('XXX');
			expect(result).to.be.false;
		});

	});

	describe('number validation', function() {

		it('should pass with int', function() {
			var result = checks.isFloat(1);
			expect(result).to.be.true;
		});

		it('should pass with int string', function() {
			var result = checks.isFloat('' + 1);
			expect(result).to.be.true;
		});

		it('should pass with float', function() {
			var result = checks.isFloat(1.5);
			expect(result).to.be.true;
		});

		it('should pass with float string', function() {
			var result = checks.isFloat('' + 1.5);
			expect(result).to.be.true;
		});

		it('should not pass with a random string', function() {
			var result = checks.isFloat('XXX');
			expect(result).to.be.false;
		});

	});

});
