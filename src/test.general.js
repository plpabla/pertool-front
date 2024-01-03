const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from './Milestone.js';
import Link from './Link.js';
import Model from './Model.js';


describe('Framework testing - to be removed', function() {
    this.slow(10);       // highlight all tasks slower than this limit
    this.timeout(500);   // timeout for each test
    before(function() {

    });

    after(function() {

    });

    beforeEach(function() {
        this.skip();
    })

    afterEach(function() {

    })

    it('equal should return True', function() {
        assert.equal(42, 42);
    });

    it('expect should work', function() {
        expect(42).to.equal(42);
    });

    it('unit test should take 200ms', function(done2) {
        setTimeout(done2, 200);
    });
});



describe('Milestone object', function() {
    before(function() {
        this.m = new Milestone("custom name");
    });

    it('has correct initial name', function() {
        expect(this.m.name).to.equal("custom name");
    });

    it('has no links attached', function() {
        expect(this.m.sourceLinks).to.length(0);
        expect(this.m.destinationLinks).to.length(0);
    });
});



describe('Link object', function() {
    before(function() {
        this.m1 = new Milestone("from");
        this.m2 = new Milestone("to");
        this.l = new Link(0, 1);
    });

    it('contains correct source milestone link ID', function() {
        expect(this.l.getSourceMilestoneId()).to.equal(0);
    });

    it('contains correct destination milestone link ID', function() {
        expect(this.l.getDestinationMilestoneId()).to.equal(1);
    });
});



describe('Model', function() {
    beforeEach(function() {
        this.model = new Model();
    });

    describe('Creation', function() {
        it('when created contains only one milestone', function() {
            expect(this.model.milestones).lengthOf(1);
        });

        it('when created does not contain any link', function() {
            expect(this.model.links).lengthOf(0);
        });
    
        it('when created has root milestone', function() {
            expect(this.model.getRoot()).instanceOf(Milestone);
        });

        it('root milestone has name "root"', function() {
            expect(this.model.getRoot().name).to.equal('root');
        });
    })

    describe('Adding milestone', function() {
        it('can add', function() {
            this.model.addMilestone("m");
    
            expect(this.model.milestones).lengthOf(2);
        })

        it('added milestone has id=1', function() {
            const id = this.model.addMilestone("m");

            expect(id).to.equal(1);
        })
    })

    describe('Adding link', function() {
        it('can add link using id and I get link id = 0', function() {
            const id1 = 0;
            const id2 = this.model.addMilestone("m2");
            const linkid = this.model.addLink(id1, id2);
    
            expect(this.model.links).lengthOf(1);
            expect(linkid).to.equal(0);
        });

        it('can add 2 links using id and second gets link id = 1', function() {
            const id1 = 0;
            const id2 = this.model.addMilestone("m2");
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
            const id2 = this.model.addMilestone("m2");
            const linkId = this.model.addLink(id1, id2);

            expect(this.model.milestones[id1].sourceLinks).contains(linkId);
        });

        it('when link is created, it is added to the destination milestone destLinks list', function() {
            const id1 = 0;
            const id2 = this.model.addMilestone("m2");
            const linkId = this.model.addLink(id1, id2);

            expect(this.model.milestones[id2].destinationLinks).contains(linkId);
        });

        it('can add link using names', function() {
            this.model.addMilestone("m2");
            this.model.addLink("root", "m2");
    
            expect(this.model.links).lengthOf(1);
        });

        it('cannot add link using name which does not exist', function() {
            this.model.addMilestone("m2");
            this.model.addLink("root", "m42");
    
            expect(this.model.links).lengthOf(0);
        })
    })

    describe('Serialization', function(){
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
    })
})