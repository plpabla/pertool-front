const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';
import Model from '../Model.js';

export default function suite() {
    beforeEach(function() {
        this.model = new Model();
    });

    it('when created contains only one milestone', function() {
        expect(this.model.milestones).lengthOf(1);
    });

    it('when created does not contain any link', function() {
        expect(this.model.links).lengthOf(0);
    });

    it('when created has root milestone', function() {
        expect(this.model.getRoot()).instanceOf(Milestone);
    });

    it('root milestone has name "0"', function() {
        expect(this.model.getRoot().name).to.equal('0');
    });
}