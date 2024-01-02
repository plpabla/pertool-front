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
        expect(this.m.linksFrom).to.length(0);
        expect(this.m.linksTo).to.length(0);
    });

    it('first milestone has id = 1', function() {
        expect(this.m.getId()).to.equal(1);
    })

    it('second milestone has id = 2', function() {
        const m2 = new Milestone("Second one")
        expect(m2.getId()).to.equal(2);
    })
});



describe('Link object', function() {
    before(function() {
        this.m1 = new Milestone("from");
        this.m2 = new Milestone("to");
        this.l = new Link(this.m1, this.m2);
    });

    it('contains correct source milestone link ID', function() {
        expect(this.l.getSourceMilestoneId()).to.equal(this.m1.getId());
    });

    it('contains correct destination milestone link ID', function() {
        expect(this.l.getDestinationMilestoneId()).to.equal(this.m2.getId());
    });

    it('when created is added to the source milestone list linksTo', function() {
        expect(this.m1.linksTo).contains(this.l);
    });

    it('when created is added to the target milestone list linksFrom', function() {
        expect(this.m2.linksFrom).contains(this.l);
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


    it('can add milestone', function() {
        this.model.addMilestone("m");

        expect(this.model.milestones).lengthOf(2);
    })

    it('can add link using ids', function() {
        this.model.addMilestone("m2");
        const id1 = this.model.getRoot().getId();
        const id2 = this.model.getMilestoneByName("m2").getId();
        this.model.addLink(id1, id2);

        expect(this.model.links).lengthOf(1);
    })

    it('can add link using names', function() {
        this.model.addMilestone("m2");
        this.model.addLink("root", "m2");

        expect(this.model.links).lengthOf(1);
    })

    it('can be serialized', function() {
        // this.skip("Skipping for now");
        const m = new Milestone("m2");
        this.model.addMilestone(m);
        const id1 = this.model.getRoot().getId();
        const id2 = m.getId();
        this.model.addLink(id1, id2);

        const res = JSON.stringify(this.model);
        
        expect(typeof res).equal('string');
    })

    it('can be deserialized', function() {
        // this.skip();
        const m = new Milestone("m2");
        this.model.addMilestone(m);
        const id1 = this.model.getRoot().getId();
        const id2 = m.getId();
        this.model.addLink(id1, id2);
        const serialized = JSON.stringify(this.model);

        const deserialized = JSON.parse(serialized);
        Object.setPrototypeOf(deserialized, Model.prototype);

        console.log(this.model);
        console.log(deserialized);
        expect(deserialized).instanceOf(Model);
        expect(deserialized).to.deep.equal(this.model);
    })
})