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
            serialized = JSON.stringify(Milestone.serialize(this.m));
        }).to.not.throw();
        expect(serialized).to.be.a.string;
    });

    it('can be deserialized into Milestone object', function() {
        const serialized = JSON.stringify(Milestone.serialize(this.m));

        let deseiralized = Milestone.deserialize(JSON.parse(serialized));

        expect(deseiralized).instanceOf(Milestone); 
    });

    it('deserialized object keeps its name', function() {
        const serialized = JSON.stringify(Milestone.serialize(this.m));

        let deseiralized = Milestone.deserialize(JSON.parse(serialized));

        expect(deseiralized.getName()).equals(this.m.getName());
    });

    it('deserialized object containes times (tmin,tmax,tbuff)', function() {
        this.m.setTmin(5);
        this.m.setTmax(24);
        this.m.setTbuffer(19);
        const serialized = JSON.stringify(Milestone.serialize(this.m));

        let deseiralized = Milestone.deserialize(JSON.parse(serialized));

        expect(deseiralized.getTmin()).equals(this.m.getTmin());
        expect(deseiralized.getTmax()).equals(this.m.getTmax());
        expect(deseiralized.getTbuffer()).equals(this.m.getTbuffer());
    });

    it('deserialized object keeps source links', function() {
        const serialized = JSON.stringify(Milestone.serialize(this.m));

        let deseiralized = Milestone.deserialize(JSON.parse(serialized));

        expect(deseiralized.sourceLinks).eqls([4]);
    });

    it('deserialized object keeps destination links', function() {
        const serialized = JSON.stringify(Milestone.serialize(this.m));

        let deseiralized = Milestone.deserialize(JSON.parse(serialized));

        expect(deseiralized.destinationLinks).eqls([10, 20]);
    });

    it('deserialized object has no pos field', function() {
        const serialized = JSON.stringify(Milestone.serialize(this.m));

        let deseiralized = Milestone.deserialize(JSON.parse(serialized));

        expect(deseiralized).to.not.have.property('pos');
    });

    it('deserialized object have image object', function() {
        const serialized = JSON.stringify(Milestone.serialize(this.m));

        let deseiralized = Milestone.deserialize(JSON.parse(serialized));

        const img = deseiralized.getImg();
        expect(img).instanceOf(Konva.Group);
    });

    it('deserialized object image is in correct position', function() {
        const serialized = JSON.stringify(Milestone.serialize(this.m));

        let deseiralized = Milestone.deserialize(JSON.parse(serialized));

        expect(deseiralized.getPos()).eqls([100, 42]);
    });
};