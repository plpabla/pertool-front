const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

export default function suite() {
    before(function() {

    });

    after(function() {

    });

    beforeEach(function() {
        this.skip();
    })

    afterEach(function() {

    })

    it('equal should return True', function() {
        assert.equal(42, 42);
    });

    it('expect should work', function() {
        expect(42).to.equal(42);
    });

    it('unit test should take 200ms', function(done2) {
        setTimeout(done2, 600);
    });
};