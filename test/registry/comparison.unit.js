'use strict';

var expect = require('chai').expect,
	checks = requireLib('registry')().checks;

describe('Comparison validation checks:', function() {

	describe('isGreater validation', function() {
		it('should pass', function() {
			var result = checks.isGreater(2, 1);
			expect(result).to.be.true;
		});

		it('should not pass', function() {
			var result = checks.isGreater(1, 2);
			expect(result).to.be.false;
		});

		it('should not pass with equal values', function() {
			var result = checks.isGreater(1, 1);
			expect(result).to.be.false;
		});

		it('or equal should pass with equal values', function() {
			var result = checks.isGreaterOrEql(1, 1);
			expect(result).to.be.true;
		});
	});

	describe('isLower validation', function() {
		it('should pass', function() {
			var result = checks.isLower(1, 2);
			expect(result).to.be.true;
		});

		it('should not pass', function() {
			var result = checks.isLower(2, 1);
			expect(result).to.be.false;
		});

		it('should not pass with equal values', function() {
			var result = checks.isLower(1, 1);
			expect(result).to.be.false;
		});

		it('or equal should pass with equal values', function() {
			var result = checks.isLowerOrEql(1, 1);
			expect(result).to.be.true;
		});
	});

	describe('isInRange validation', function() {
		it('should pass', function() {
			var result = checks.isInRange(2, 1, 3);
			expect(result).to.be.true;
		});

		it('should not pass', function() {
			var result = checks.isInRange(1, 2, 3);
			expect(result).to.be.false;
		});

		it('should not pass with equal values', function() {
			var result = checks.isInRange(1, 1, 2);
			expect(result).to.be.false;
		});

		it('or equal should pass with equal values', function() {
			var result = checks.isInRangeOrEql(1, 1, 3);
			expect(result).to.be.true;
		});
	});

});
