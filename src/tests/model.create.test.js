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
}