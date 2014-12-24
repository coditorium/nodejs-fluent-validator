'use strict';

var expect = require('chai').expect,
	checks = requireLib('registry')().checks;

describe('Other validation checks:', function() {

	describe('mongo objectId validation', function() {

		it('should pass', function() {
			var result = checks.isMongoObjectId('507f191e810c19729de860ea');
			expect(result).to.be.true;
		});

		it('should not pass', function() {
			var result = checks.isMongoObjectId('xxxx');
			expect(result).to.be.false;
		});

	});

	describe('empty validation', function() {

		it('should pass with null', function() {
			var result = checks.isEmpty(null);
			expect(result).to.be.true;
		});

		it('should pass with undefined', function() {
			var result = checks.isEmpty(undefined);
			expect(result).to.be.true;
		});

		it('should pass with empty string', function() {
			var result = checks.isEmpty('');
			expect(result).to.be.true;
		});

	});

	describe('custom validation', function() {

		it('should pass with custom validation', function() {
			var result = checks.passes(123, function(value) {
				return !!value;
			});
			expect(result).to.be.true;
		});

		it('should not pass with custom validation', function() {
			var result = checks.passes(123, function(value) {
				return !value;
			});
			expect(result).to.be.false;
		});

	});

});
