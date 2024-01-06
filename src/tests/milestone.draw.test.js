const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';
const Konva = require('konva');

export default function suite() {
    before(function() {
        this.m = new Milestone(0, 0, "custom name");
    });

    it('can get image object', function() {
        let img;

        expect(() => {
            img = this.m.getImg();
        }).to.not.throw();
        expect(img).instanceOf(Konva.Group);
    });

    it('is drawn at given postion', function() {
        const m = new Milestone(42, 100, "test");

        expect(m.getPos()).eqls([42, 100]);
    })
};