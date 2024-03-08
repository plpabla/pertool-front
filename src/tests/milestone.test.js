const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';

export default function suite() {
    beforeEach(function() {
        Milestone._id = 0;
        this.m = new Milestone(0, 0, "custom id", "custom descr");
    });

    it('has correct initial name', function() {
        expect(this.m.name).to.equal("custom id");
    });

    it('has correct initial description', function() {
        expect(this.m.description).to.equal("custom descr");
    });

    it('has no links attached', function() {
        expect(this.m.sourceLinks).to.length(0);
        expect(this.m.destinationLinks).to.length(0);
    });

    it('inherits img coordinates from parent class', function() {
        expect(this.m).to.have.property('_img');
    });

    it('has image', function() {
        expect(this.m.getImg()).to.be.not.null;
    });

    it('has id', function() {
        expect(this.m.getId()).to.equal(0);
    })

    it('second created milestone has bigger id', function() {
        const m2 = new Milestone(0, 0, "custom id", "custom descr");

        expect(m2.getId()).greaterThan(this.m.getId());
    })
};