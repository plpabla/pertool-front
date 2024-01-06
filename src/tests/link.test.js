const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';
import Link from '../Link.js';

export default function suite() {
    before(function() {
        this.l = new Link(0, 1);
    });

    it('contains correct source milestone link ID', function() {
        expect(this.l.getSourceMilestoneId()).to.equal(0);
    });

    it('contains correct destination milestone link ID', function() {
        expect(this.l.getDestinationMilestoneId()).to.equal(1);
    });

    it('can get image object', function() {
        let img;

        expect(() => {
            img = this.l.getImg();
        }).to.not.throw();
        expect(img).instanceOf(Konva.Arrow);
    });
};