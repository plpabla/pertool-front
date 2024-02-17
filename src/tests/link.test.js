const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';
import Link from '../Link.js';

export default function suite() {
    before(function() {
        this.l = new Link(0, 1, 0, [10, 20, 100, 100]);
    })

    it('contains correct source milestone link ID', function() {
        expect(this.l.getSourceMilestoneId()).to.equal(0);
    })

    it('contains correct destination milestone link ID', function() {
        expect(this.l.getDestinationMilestoneId()).to.equal(1);
    })

    it('can get image object', function() {
        let img;

        expect(() => {
            img = this.l.getImg();
        }).to.not.throw();
        expect(img).instanceOf(Konva.Group);
    })

    it('initial position is set to given value in constructor if passed', function() {
        const l = new Link(0,1,0,[4,2,6,9]);

        expect(l.points).to.eqls([4,2,6,9]);
    })

    it('task length is set correctly', function() {
        const l = new Link(0,1,4.2,[1,2,2,1]);

        expect(l.getTaskLength()).equal(4.2);
    })

    it('can be moved', function() {
        this.l.setPosition(4,2,6,9);

        expect(this.l.getPos()).to.eqls([4,2,6,9]);
    })

    it('when task is zero length, line is solid', function() {
        const l = new Link(0, 1, 0, [1,2,2,1]);

        expect(l.isDashEnabled()).to.be.true;
    })


    it('when task is non-zero length, line is solid', function() {
        const l = new Link(0, 1, 42, [1,2,2,1]);

        expect(l.isDashEnabled()).to.be.false;
    })
};