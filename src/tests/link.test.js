const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';
import Link from '../Link.js';

export default function suite() {
    before(function() {
        this.m1 = new Milestone("from");
        this.m2 = new Milestone("to");
        this.l = new Link(0, 1);
    });

    it('contains correct source milestone link ID', function() {
        expect(this.l.getSourceMilestoneId()).to.equal(0);
    });

    it('contains correct destination milestone link ID', function() {
        expect(this.l.getDestinationMilestoneId()).to.equal(1);
    });

    it('inherits x,y coordinates from parent class', function() {
        expect(this.l).to.have.property('x');
        expect(this.l).to.have.property('y');
    });

    it('can be drawn', function() {
        expect(() => {
            this.l.draw();
        }).to.not.throw();
    });
};