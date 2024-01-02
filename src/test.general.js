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
    before(function() {
        this.m = new Milestone("custom name");
    });

    it('has correct initial name', function() {
        expect(this.m.name).to.equal("custom name");
    });

    it('has no links attached', function() {
        expect(this.m.linksFrom).to.length(0);
        expect(this.m.linksTo).to.length(0);
    })
});

import Link from './Link.js';
describe('Link object', function() {
    before(function() {
        this.m1 = new Milestone("from");
        this.m2 = new Milestone("to");
        this.l = new Link(this.m1, this.m2);
    });

    it('contains correct milestone 1', function() {
        expect(this.l.m1.name).to.equal("from");
    });

    it('contains correct milestone 2', function() {
        expect(this.l.m2.name).to.equal("to");
    });

    it('when created is added to the source milestone list linksTo', function() {
        expect(this.m1.linksTo).contains(this.l);
    });

    it('when created is added to the target milestone list linksFrom', function() {
        expect(this.m2.linksFrom).contains(this.l);
    });
});