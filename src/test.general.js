const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

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


import Milestone from './Milestone.js';
describe('Milestone object', function() {
    it('can be created', function() {
        const m = new Milestone("custom name");
    });

    it('has correct initial name', function() {
        const m = new Milestone("custom name");
        expect(m.name).to.equal("custom name");
    });
});