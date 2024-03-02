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
    });

    it('can add link using id and I get link id >= 0', function() {
        const id1 = 0;
        const id2 = this.model.addMilestone(10, 0, "m2");
        const linkid = this.model.addLink(id1, id2);

        expect(this.model.links).lengthOf(1);
        expect(linkid).to.greaterThanOrEqual(0);
    });

    it('can add 2 links using id and second gets link id = n+1', function() {
        const id1 = 0;
        const id2 = this.model.addMilestone(10, 0, "m2");
        const linkid0 = this.model.addLink(id1, id2);
        const linkid = this.model.addLink(id1, id2);

        expect(this.model.links).lengthOf(2);
        expect(linkid).to.equal(linkid0+1);
    });

    it('cannot add link to itself', function() {
        const id1 = 0;
        const id2 = 0;
        const linkid = this.model.addLink(id1, id2);

        expect(linkid).to.equal(undefined);
        expect(this.model.links).lengthOf(0);
    });

    it('when I pass nonexistent ID (1), it is not added', function() {
        const linkid = this.model.addLink(0, 1);

        expect(linkid).to.equal(undefined);
        expect(this.model.links).lengthOf(0);
    });

    it('when link is created, it is added to the source milestone sourceLinks list', function() {
        const id1 = 0; //root
        const id2 = this.model.addMilestone(10, 0, "m2");
        const linkId = this.model.addLink(id1, id2);

        expect(this.model.milestones[id1].sourceLinks).contains(linkId);
    });

    it('when link is created, it is added to the destination milestone destLinks list', function() {
        const id1 = 0;
        const id2 = this.model.addMilestone(10, 0, "m2");
        const linkId = this.model.addLink(id1, id2);

        expect(this.model.milestones[id2].destinationLinks).contains(linkId);
    });

    it('can add link using names', function() {
        this.model.addMilestone(0, 0, "m2");
        this.model.addLink("0", "m2");

        expect(this.model.links).lengthOf(1);
    });

    it('cannot add link using name which does not exist', function() {
        this.model.addMilestone(0, 0, "m2");
        this.model.addLink("0", "m42");

        expect(this.model.links).lengthOf(0);
    });

    it('added link has stored task length', function() {
        const id1 = 0; //root
        const id2 = this.model.addMilestone(10, 0, "m2");

        const linkId = this.model.addLink(id1, id2, 4.2);

        expect(this.model.getLinkWithId(linkId).getTaskLength()).equal(4.2);
    });

    describe('calculation of arrow position', function() {
        it('two milestones in the same y pos', function() {
            const m1 = new Milestone(100, 200, "0");
            const m2 = new Milestone(500, 200, "1");

            const pos = Model.calculateArrowPosition(m1, m2);

            expect(pos).to.eqls([100+Milestone.radius, 200, 500-Milestone.radius, 200]);
        })

        it('two milestones in the same x pos', function() {
            const m1 = new Milestone(100, 200, "0");
            const m2 = new Milestone(100, 900, "1");

            const pos = Model.calculateArrowPosition(m1, m2);

            expect(pos).to.eqls([100, 200+Milestone.radius, 100, 900-Milestone.radius]);
        })
    })
}