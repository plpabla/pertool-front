const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';
import Link from '../Link.js';

export default function suite() {
    before(function() {
        this.l = new Link(0, 1, 0);
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
        expect(img).instanceOf(Konva.Arrow);
    })

    it('initial position is set to default in constructor if not passed', function() {
        const l = new Link(0,1);

        expect(l.points).to.eqls([1,2,3,4]);
    })

    it('initial position is set to given value in constructor if passed', function() {
        const l = new Link(0,1,0,[4,2,6,9]);

        expect(l.points).to.eqls([4,2,6,9]);
    })

    it('has default task length equal zero', function() {
        const l = new Link(0,1);

        expect(l.taskLength).equal(0);
    })

    it('can set default task length', function() {
        const l = new Link(0,1,4.2);

        expect(l.taskLength).equal(4.2);
    })

    it('can be moved', function() {
        this.l.setPosition(4,2,6,9);

        expect(this.l.img.attrs.points).to.eqls([4,2,6,9]);
    })
};