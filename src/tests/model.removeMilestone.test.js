const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Model from '../Model.js';
import Link from '../Link.js';
import sinon from 'sinon';
import Milestone from '../Milestone.js';

export default function suite() {
    beforeEach(function() {
        const layerMock = {
            add: (x) => {}
        }
        this.model = new Model(layerMock);
        const m1id = this.model.addMilestone(1,2,"m1");
        const m2id = this.model.addMilestone(3,4,"m2");
        const m3id = this.model.addMilestone(5,6,"m3");
        this.model.addLink(m1id,m2id,10);
        this.model.addLink(m1id,m3id,0);
    });

    it('I can remove a milestone when I pass it as an object and it is replaced with null in milestones', function() {
        const m = this.model.milestones[1];
        
        this.model.removeMilestone(m);

        expect(this.model.milestones[1]).to.be.null;
    });
}