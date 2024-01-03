const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Model from '../Model.js';

export default function suite() {
    beforeEach(function() {
        this.model = new Model();
    });

    it('can add', function() {
        this.model.addMilestone("m");

        expect(this.model.milestones).lengthOf(2);
    })

    it('added milestone has id=1', function() {
        const id = this.model.addMilestone("m");

        expect(id).to.equal(1);
    })
}