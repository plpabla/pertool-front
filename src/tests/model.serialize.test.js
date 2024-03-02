const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Model from '../Model.js';
import Link from '../Link.js';

export default function suite() {
    beforeEach(function() {
        const layerMock = {
            add: (x) => {}
        }
        this.model = new Model(layerMock);
    });

    it('can be serialized', function() {
        this.model.addMilestone(0, 0, "m2");
        this.model.addLink("0", "m2");

        const res = Model.serialize(this.model);
        
        expect(typeof res).equal('string');
    })

    it('can be deserialized', function() {
        this.model.addMilestone(0, 0, "m2");
        this.model.addLink("0", "m2");
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);

        expect(deserialized).instanceOf(Model);
    })
    

    it('I can access root object in deserialized object', function() {
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);
        const rootObj = deserialized.getRoot();

        expect(rootObj.getName()).to.equal("0");
    })

    it('Restored milestone has the same properties', function() {
        this.model.addMilestone(0, 0, "m2");
        this.model.addLink("0", "m2");
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);

        const originalm2 = this.model.getMilestoneByName("m2");
        const m2 = deserialized.getMilestoneByName("m2");

        // Don't compare images - new object is created after deserialization
        delete originalm2._img;
        delete m2._img;
        delete originalm2.parentModel;
        delete m2.parentModel;

        expect(m2).to.eqls(originalm2);
    })

    it('I can access milestone from an array in deserialized object and use its methods', function() {
        this.model.addMilestone(0, 0, "m2");
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);

        const originalm2 = this.model.findMilestoneIDByName("m2");
        const m2 = deserialized.findMilestoneIDByName("m2");

        expect(deserialized.milestones[m2].getName()).to.equal(this.model.milestones[originalm2].getName());
    })

    it('I can access link in deserialized object', function() {
        this.model.addMilestone(0, 0, "m2");
        this.model.addLink("0", "m2");
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);

        
        expect(deserialized.links[0].getSourceMilestoneId()).to.equal(this.model.links[0].getSourceMilestoneId());
    })

    it('I can access milestone postiotion from deserialized object', function() {
        this.model.addMilestone(10, 42, "m2");
        this.model.addLink("0", "m2");
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized);

        expect(deserialized.milestones[1].getPos()).to.eql([10, 42]);
    })

    it('Link id counter is updated after serialization', function() {
        this.model.addMilestone(10, 42, "m2");
        this.model.addLink("0", "m2");
        const serialized = Model.serialize(this.model);
        const linkIdDuringSerialization = Link._id;

        const deserialized = Model.deserialize(serialized);

        expect(Link._id).to.equal(linkIdDuringSerialization);
    })

    it('I can work with deserialized object by adding links and milestones to it', function() {
        this.model.addMilestone(0, 0, "m2");
        this.model.addLink("0", "m2");
        const layerMock = {
            add: (x) => {}
        }
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized, layerMock);
        deserialized.addMilestone(0, 0, "m3");
        deserialized.addLink("0", "m3");

        expect(deserialized.milestones).lengthOf(3);
        expect(deserialized.links).lengthOf(2);
        expect(deserialized.milestones[0].getName()).to.equal("0");
        expect(deserialized.milestones[1].getName()).to.equal("m2");
        expect(deserialized.milestones[2].getName()).to.equal("m3");
        expect(deserialized.findMilestoneIDByName("m2")).to.equal(1);
    })

    it('Model deserialized with removed links is the same', function() {
        this.model.addMilestone(0, 0, "m2");
        this.model.addMilestone(10,20, "m3");
        this.model.addLink("0", "m2");
        this.model.addLink("m2", "m3");
        this.model.removeLink(this.model.links[0]);
        const originalLinksAray = this.model.links;
        const layerMock = {
            add: (x) => {}
        }
        const serialized = Model.serialize(this.model);

        const deserialized = Model.deserialize(serialized, layerMock);

        expect(deserialized.links).lengthOf(originalLinksAray.length);
        for(const idx in originalLinksAray) {
            if (originalLinksAray[idx] === null) {
                expect(deserialized.links[idx]).to.be.null;
            } else {
                expect(deserialized.links[idx].getSourceMilestoneId()).equal(originalLinksAray[idx].getSourceMilestoneId());
            }
        }
    })
};