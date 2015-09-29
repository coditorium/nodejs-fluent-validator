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

	describe('is not null validation', function() {

		it('should not pass with null', function() {
	        var result = checks.isNotNull(null);
			expect(result).to.be.false;
	    });

		it('should pass with value', function() {
			var result = checks.isNotNull(1);
			expect(result).to.be.true;
		});
	});

	describe('is not undefined validation', function() {

		it('should not pass with undefined', function() {
			var result = checks.isNotUndefined(undefined);
			expect(result).to.be.false;
		});

		it('should pass with value', function() {
			var result = checks.isNotUndefined(1);
			expect(result).to.be.true;
		});
	});

	describe('is not null or undefined validation', function() {

		it('should not pass with undefined', function() {
			var result = checks.isNotNullOrUndefined(undefined);
			expect(result).to.be.false;
		});

		it('should not pass with null', function() {
			var result = checks.isNotNullOrUndefined(null);
			expect(result).to.be.false;
		});

		it('should pass with value', function() {
			var result = checks.isNotNullOrUndefined(1);
			expect(result).to.be.true;
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
