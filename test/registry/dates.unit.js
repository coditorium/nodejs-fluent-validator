'use strict';

var expect = require('chai').expect,
	checks = requireLib('registry')().checks;

describe('Date validation checks:', function() {

	var now = new Date(),
		before = new Date(now.getTime() - 1),
		after = new Date(now.getTime() + 1);

	describe('date type validation', function() {

		it('should pass with date as input', function() {
			var result = checks.isDate(new Date());
			expect(result).to.be.true;
		});

		it('should pass with string as input', function() {
			var result = checks.isDate('' + new Date());
			expect(result).to.be.true;
		});

		it('should not pass with random string as input', function() {
			var result = checks.isDate('XXX');
			expect(result).to.be.false;
		});

		it('should not pass with random number as input', function() {
			var result = checks.isDate(123123123);
			expect(result).to.be.false;
		});

	});

	describe('isAfter', function() {

		it('should pass after', function() {
			var result = checks.isAfter(now, before);
			expect(result).to.be.true;
		});

		it('should not pass after', function() {
			var result = checks.isAfter(now, after);
			expect(result).to.be.false;
		});

		it('should pass after or equal', function() {
			var result = checks.isAfterOrEql(now, now);
			expect(result).to.be.true;
		});

	});

	describe('isBefore', function() {

		it('should pass before', function() {
			var result = checks.isBefore(now, after);
			expect(result).to.be.true;
		});

		it('should not pass before', function() {
			var result = checks.isBefore(now, before);
			expect(result).to.be.false;
		});

		it('should pass before or equal', function() {
			var result = checks.isBeforeOrEql(now, now);
			expect(result).to.be.true;
		});

	});

});
