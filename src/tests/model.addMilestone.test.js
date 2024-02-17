const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Model from '../Model.js';
import Link from '../Link.js';
import sinon from 'sinon';
import Milestone from '../Milestone.js';

export default function suite() {
    beforeEach(function() {
        const layerMock = {
            add: (x) => {}
        }
        this.model = new Model(layerMock);
    });

    it('can add', function() {
        this.model.addMilestone(10, 10, "m");

        expect(this.model.milestones).lengthOf(2);
    })

    it('added milestone has id=1', function() {
        const id = this.model.addMilestone(10, 10, "m");

        expect(id).to.equal(1);
    })

    it('added milestone ID can be found', function() {
        const id = this.model.addMilestone(10, 10, "m");

        const foundID = this.model.findMilestoneIDByName("m");

        expect(foundID).to.equal(id);
    })

    it('added milestone object can be found', function() {
        const id = this.model.addMilestone(10, 10, "m");

        const m = this.model.getMilestoneByName("m");

        expect(m.getName()).to.equal("m");
    })

    it('is added at correct position on canvas', function() {
        const id = this.model.addMilestone(10, 20, "m");
        const m = this.model.getMilestoneByName("m");

        expect(m.getPos()).to.eqls([10, 20]);
    })

    describe('Moving milestone', function() {
        it('onDrag() function updates source link arrows', function() {
            this.model.addMilestone(10, 10, "m");
            this.model.addLink(0,1,10);
            const m = this.model.getRoot();
            const link = this.model.links[0];
            const setPositionSpy = sinon.spy(link, "setPosition");

            this.model.onDrag(m);
            
            expect(setPositionSpy.callCount).to.equal(1);
            setPositionSpy.restore();
        })

        it('onDrag() function updates source link arrows', function() {
            this.model.addMilestone(10, 10, "m");
            this.model.addLink(0,1,10);
            const m = this.model.getMilestoneByName("m");
            const link = this.model.links[0];
            const setPositionSpy = sinon.spy(link, "setPosition");

            this.model.onDrag(m);
            
            expect(setPositionSpy.callCount).to.equal(1);
            setPositionSpy.restore();
        })

        it('updated position is correct', function() {
            this.model.addMilestone(10, 10, "m1");
            this.model.addMilestone(100, 10, "m2");
            const m1id = this.model.findMilestoneIDByName("m1");
            const m1 = this.model.getMilestoneById(m1id);
            const m2id = this.model.findMilestoneIDByName("m2");
            this.model.addLink(m1id,m2id,10);
            const link = this.model.links[0];

            m1.img.position({x: 20, y: 10});
            this.model.onDrag(m1);
            
            expect(link.getPos()).to.eqls([20+Milestone.radius, 10, 100-Milestone.radius, 10]);
        })
    })
}