const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Model from '../Model.js';
import Link from '../Link.js';
import sinon from 'sinon';

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
    })
}