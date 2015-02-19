'use strict';

var expect = require('chai').expect,
	validator = require('../index');

describe('Parameterized validation:', function() {

	describe('should pass', function() {

		it('simple parameterized validation', function() {
			var validation = validator('Y').isIn(['X', 'Y', 'Z']);
			expect(validation.hasErrors()).to.be.false;
		});

	});

	describe('should fail', function() {

		it('with parametrized message', function() {
			var validation = validator('W').isIn(['X', 'Y', 'Z']);
			expect(validation.hasErrors()).to.be.true;
			expect(validation.getErrors()[0].message).to.be.equal('Required a value that is equal to one of X,Y,Z');
		});

	});

});
