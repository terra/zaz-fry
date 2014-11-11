var should = require('should');

describe('basics', function() {
	it('should pass', function(done) {
		let x = true;
		x.should.be.true;
		done();
	});
});