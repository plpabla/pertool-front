const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';

export default function suite() {
    before(function() {
        this.m = new Milestone("custom name");
    });

    it('has correct initial name', function() {
        expect(this.m.name).to.equal("custom name");
    });

    it('has no links attached', function() {
        expect(this.m.sourceLinks).to.length(0);
        expect(this.m.destinationLinks).to.length(0);
    });

    it('inherits x,y coordinates from parent class', function() {
        expect(this.m).to.have.property('x');
        expect(this.m).to.have.property('y');
    });

    it('initial postion is (0,0)', function() {
        expect(this.m.getPos()).to.eql([0, 0]);       // deep equality
    });
};