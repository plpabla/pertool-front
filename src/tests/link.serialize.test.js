const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Link from '../Link.js';
import Milestone from '../Milestone.js';
const Konva = require('konva');

export default function suite() {
    beforeEach(function() {
        this.l = new Link(1, 5, 4.2, [10, 20, 30, 40]);
    });

    it('can be serialized', function() {
        let serialized;

        expect(() => {
            serialized = JSON.stringify(Link.serialize(this.l));
        }).to.not.throw();
        expect(serialized).to.be.a.string;
    });

    it('deserialized contains the same milestone IDs', function() {
        const serialized = JSON.stringify(Link.serialize(this.l));

        const deserialized = Link.deserialize(JSON.parse(serialized));

        expect(deserialized.getSourceMilestoneId()).to.equal(this.l.getSourceMilestoneId());
        expect(deserialized.getDestinationMilestoneId()).to.equal(this.l.getDestinationMilestoneId());
    });

    it('deserialized contains task length', function() {
        const serialized = JSON.stringify(Link.serialize(this.l));

        const deserialized = Link.deserialize(JSON.parse(serialized));

        expect(deserialized.taskLength).to.equal(4.2);
    });

    it('deserialized contains link id', function() {
        const serialized = JSON.stringify(Link.serialize(this.l));
        const linkId = this.l.getId();

        const deserialized = Link.deserialize(JSON.parse(serialized));

        expect(deserialized.getId()).to.equal(linkId);
    });

    it('deserialized contains Konva.Group', function() {
        const serialized = JSON.stringify(Link.serialize(this.l));

        const deserialized = Link.deserialize(JSON.parse(serialized));

        expect(deserialized.getImg()).instanceOf(Konva.Group);
    });

    it('deserialized contains the same graphical element properties', function() {
        this.skip("Not needed");
        const serialized = JSON.stringify(Link.serialize(this.l));

        const deserialized = Link.deserialize(JSON.parse(serialized));

        expect(deserialized.img.attrs).to.eqls(this.l.img.attrs);
    });
};