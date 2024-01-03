const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Model from '../Model.js';

export default function suite() {
    beforeEach(function() {
        this.model = new Model();
    });

    it('can be serialized', function() {
        // this.skip("Skipping for now");
        this.model.addMilestone("m2");
        this.model.addLink("root", "m2");

        const res = JSON.stringify(this.model);
        
        expect(typeof res).equal('string');
    })

    it('can be deserialized', function() {
        this.model.addMilestone("m2");
        this.model.addLink("root", "m2");
        const serialized = JSON.stringify(this.model);

        const deserialized = JSON.parse(serialized);
        Object.setPrototypeOf(deserialized, Model.prototype);

        expect(deserialized).instanceOf(Model);
        expect(deserialized).to.deep.equal(this.model);
    })

    it('I can access root object in deserialized object', function() {
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);
        const rootObj = deserialized.getRoot();

        expect(rootObj.getName()).to.equal("root");
    })

    it('I can access milestone from an array in deserialized object', function() {
        this.model.addMilestone("m2");
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);

        const originalm2 = this.model.getMilestoneByName("m2");
        const m2 = deserialized.getMilestoneByName("m2");

        expect(m2).to.equal(originalm2);
        expect(deserialized.milestones[m2].getName()).to.equal(this.model.milestones[originalm2].getName());
    })

    it('I can access link in deserialized object', function() {
        this.model.addMilestone("m2");
        this.model.addLink("root", "m2");
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);

        
        expect(deserialized.links[0].getSourceMilestoneId()).to.equal(this.model.links[0].getSourceMilestoneId());
    })

    it('I can access work with deserialized object by adding links and milestones to it', function() {
        this.model.addMilestone("m2");
        this.model.addLink("root", "m2");
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);
        deserialized.addMilestone("m3");
        deserialized.addLink("root", "m3");

        expect(deserialized.milestones).lengthOf(3);
        expect(deserialized.links).lengthOf(2);
        expect(deserialized.milestones[0].getName()).to.equal("root");
        expect(deserialized.milestones[1].getName()).to.equal("m2");
        expect(deserialized.milestones[2].getName()).to.equal("m3");
        expect(deserialized.getMilestoneByName("m2")).to.equal(1);
    })
};