'use strict';

var expect = require('chai').expect,
	checks = requireLib('registry')().checks;

// Most string validations come from validator module
// and are already tested
describe('String validation checks:', function() {

	describe('email validation', function() {

		it('should pass', function() {
			var result = checks.isEmail('sherlock.holmes@gmail.com');
			expect(result).to.be.true;
		});

	});

});
