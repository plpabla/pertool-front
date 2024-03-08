const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';
import Model from '../Model.js';

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

    it('I can remove a link when I pass it as an object and it is removed in links array', function() {
        const LINKS_COUNT = this.model.links.length;
        const link = this.model.links[1];
        
        this.model.removeLink(link);

        expect(this.model.links.length).equal(LINKS_COUNT-1);
    });

    it('correct link is removed', function() {
        const linkToRemove = this.model.links[0];
        
        this.model.removeLink(linkToRemove);

        expect(this.model.links).not.contains(linkToRemove);
    });

    [0,1].forEach(function(LINK_ID){
        it(`when link ${LINK_ID} is removed, it is also removed from source milestone links list`, function() {
            const linkToRemove = this.model.links[LINK_ID];
            const sourceMilestoneId = linkToRemove.getSourceMilestoneId();
            
            this.model.removeLink(linkToRemove);

            expect(this.model.getMilestoneById(sourceMilestoneId).sourceLinks).not.contains(LINK_ID);
        });

        it(`when link ${LINK_ID} is removed, it is also removed from destination milestone links list`, function() {
            const linkToRemove = this.model.links[LINK_ID];
            const destMilestoneId = linkToRemove.getDestinationMilestoneId();
            
            this.model.removeLink(linkToRemove);

            expect(this.model.getMilestoneById(destMilestoneId).destinationLinks).not.contains(LINK_ID);
        })
    });
}