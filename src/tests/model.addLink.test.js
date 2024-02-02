const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Model from '../Model.js';

export default function suite() {
    beforeEach(function() {
        this.model = new Model();
    });

    it('can add link using id and I get link id = 0', function() {
        const id1 = 0;
        const id2 = this.model.addMilestone(10, 0, "m2");
        const linkid = this.model.addLink(id1, id2);

        expect(this.model.links).lengthOf(1);
        expect(linkid).to.equal(0);
    });

    it('can add 2 links using id and second gets link id = 1', function() {
        const id1 = 0;
        const id2 = this.model.addMilestone(10, 0, "m2");
        this.model.addLink(id1, id2);
        const linkid = this.model.addLink(id1, id2);

        expect(this.model.links).lengthOf(2);
        expect(linkid).to.equal(1);
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
}