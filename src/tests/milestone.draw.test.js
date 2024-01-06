const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';

export default function suite() {
    before(function() {
        this.m = new Milestone("custom name");
    });

    it('can be drawn', function() {
        expect(() => {
            this.m.draw();
        }).to.not.throw();
    });

    it('can be moved to different position', function() {
        this.m.setPos([10, 10]);

        expect(this.m.getPos()).to.eql([10, 10]);
    })
};