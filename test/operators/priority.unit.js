'use strict';

var expect = require('chai').expect,
	validator = requireLib('index');

describe('Priority:', function() {

	describe('a || b && c <=> a || (b && c) <=> true', function() {

		it('where a=1 b=0 c=0', function() {
			var result = validator().validate(-1.5).isFloat().or.isInt().and.isPositive().check();
			expect(result).to.be.true;
		});

		it('where a=1 b=1 c=0', function() {
			var result = validator().validate(-1.5).isNegative().or.isFloat().and.isPositive().check();
			expect(result).to.be.true;
		});

	});

	describe('a && b || c <=> (a && b) || c <=> true', function() {

		it('where a=0 b=0 c=1', function() {
			var result = validator().validate(-1.5).isInt().and.isPositive().or.isFloat().check();
			expect(result).to.be.true;
		});

		it('where a=0 b=1 c=1', function() {
			var result = validator().validate(1.5).isInt().or.isFloat().and.isPositive().check();
			expect(result).to.be.true;
		});

	});

});
