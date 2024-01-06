const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';
const Konva = require('konva');

export default function suite() {
    beforeEach(function() {
        this.m = new Milestone(100, 42, "custom name");
        this.m.addLinkWhereIAmDestination(10);
        this.m.addLinkWhereIAmDestination(20);
        this.m.addLinkWhereIAmSource(4);
    });

    it('can be serialized', function() {
        let serialized;

        expect(() => {
            serialized = Milestone.serialize(this.m);
        }).to.not.throw();
        expect(serialized).to.be.a.string;
    });

    it('can be deserialized into Milestone object', function() {
        const serialized = Milestone.serialize(this.m);

        let deseiralized = Milestone.deserialize(serialized);

        expect(deseiralized).instanceOf(Milestone);
    });

    it('deserialized object keeps its name', function() {
        const serialized = Milestone.serialize(this.m);

        let deseiralized = Milestone.deserialize(serialized);

        expect(deseiralized.getName()).equals(this.m.getName());
    });

    it('deserialized object keeps source links', function() {
        const serialized = Milestone.serialize(this.m);

        let deseiralized = Milestone.deserialize(serialized);

        expect(deseiralized.sourceLinks).eqls([4]);
    });

    it('deserialized object keeps destination links', function() {
        const serialized = Milestone.serialize(this.m);

        let deseiralized = Milestone.deserialize(serialized);

        expect(deseiralized.destinationLinks).eqls([10, 20]);
    });

    it('deserialized object has no pos field', function() {
        const serialized = Milestone.serialize(this.m);

        let deseiralized = Milestone.deserialize(serialized);

        expect(deseiralized).to.not.have.property('pos');
    });

    it('deserialized object have image object', function() {
        const serialized = Milestone.serialize(this.m);

        let deseiralized = Milestone.deserialize(serialized);

        const img = deseiralized.img;
        expect(img).instanceOf(Konva.Group);
    });

    it('deserialized object image is in correct position', function() {
        const serialized = Milestone.serialize(this.m);

        let deseiralized = Milestone.deserialize(serialized);

        expect(deseiralized.getPos()).eqls([100, 42]);
    });
};