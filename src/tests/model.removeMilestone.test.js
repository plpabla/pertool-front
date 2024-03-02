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
        const m4id = this.model.addMilestone(5,6,"m4");
        this.model.addLink(m1id,m2id,10);
        this.model.addLink(m1id,m3id,0);
        this.model.addLink(m2id, m3id, 2);
        this.model.addLink(m4id, m1id, 8);
    });

    it('I can remove a milestone when I pass it as an object and it is replaced with null in milestones', function() {
        const m1id = this.model.findMilestoneIDByName("m1");
        const m1 = this.model.getMilestoneById(m1id);
        
        this.model.removeMilestone(m1);

        expect(this.model.getMilestoneById(m1id)).to.be.null;
    });

    it('when I remove milestone, all connected links are also removed', function() {
        const m1id = this.model.findMilestoneIDByName("m1");
        const m1 = this.model.getMilestoneById(m1id);
        const sourceLinks = m1.sourceLinks;
        const destLinks = m1.destinationLinks;
        const allLinks = [...sourceLinks, ...destLinks];
        
        this.model.removeMilestone(m1);

        allLinks.forEach(id=>{
            expect(this.model.getLinkWithId(id)).to.be.null;
        })
    });
}