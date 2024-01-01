// TODO: change vart to const
var assert = chai.assert;
var expect = chai.expect;

describe('Framework testing - to be removed', function() {
    this.slow(10);       // highlight all tasks slower than this limit
    this.timeout(500);   // timeout for each test
    before(function() {
        console.log("Framework testing started");
    });

    after(function() {
        console.log("Framework testing finished");
    });

    beforeEach(function() {
        console.log("One of framework tests started");
    })

    afterEach(function() {
        console.log("One of framework tests finished");
    })

    it('equal should return True', function() {
        assert.equal(42, 42);
    });

    it('expect should work', function() {
        expect(42).to.equal(42);
    });

    it('unit test should take 200ms', function(done2) {
        setTimeout(done2, 200);
    });
});

describe('Milestone object', function() {
    it('can be created', function() {
        const milestone = new Milestone("custom name");
    })
});