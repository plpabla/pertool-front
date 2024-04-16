const chai = require('chai');
const expect = chai.expect;
import Milestone from '../Milestone';
import Link from '../Link';
import Model from '../Model';

export default function suite() {
  describe('Milestone specific', function () {
    beforeEach(function () {
      this.m = new Milestone(0, 0, "custom id", "custom descr");
    })

    it('created milestone is not on critical path', function () {
      expect(this.m.onCriticalPath).to.equal(false);
    })

    it('can update onCriticalPath of milestone', function () {
      this.m.onCriticalPath = true

      expect(this.m.onCriticalPath).to.equal(true)
    })

    it('when I update onCriticalPath, milestone image is updated', function () {
      this.m.onCriticalPath = true

      const circleImg = this.m._getElement("Circle");
      expect(circleImg.stroke()).to.equal(Milestone._param.onCriticalPathColor)
    })
  })

  describe('Link specific', function () {
    it('created link is not on critical path', function () {
      const l = new Link(0, 1, 0, [10, 20, 100, 100]);

      expect(l.onCriticalPath).to.equal(false);
    });
  })


  describe('Model', function () {
    beforeEach(function () {
      const layerMock = {
        add: (x) => { }
      }
      this.model = new Model(layerMock);

      this.idm1 = this.model.addMilestone(0, 0, "1");
      this.idm2 = this.model.addMilestone(0, 0, "2");
      this.idm3 = this.model.addMilestone(0, 0, "3");
      this.idl12 = this.model.addLink(this.idm1, this.idm2, 14);
      this.idl23 = this.model.addLink(this.idm2, this.idm3, 40);
    })

    it('model is storing onCriticalPath properties as expected', function () {
      this.model.getMilestoneById(this.idm1).onCriticalPath = true
      this.model.getLinkWithId(this.idl12).onCriticalPath = true

      expect(this.model.getMilestoneById(this.idm1).onCriticalPath).to.equal(true)
      expect(this.model.getMilestoneById(this.idm2).onCriticalPath).to.equal(false)
      expect(this.model.getLinkWithId(this.idl12).onCriticalPath).to.equal(true)
      expect(this.model.getLinkWithId(this.idl23).onCriticalPath).to.equal(false)
    })

    it('After deserialization, properties remains', function() {
      this.model.getMilestoneById(this.idm1).onCriticalPath = true
      this.model.getLinkWithId(this.idl12).onCriticalPath = true

      const m2 = Model.deserialize(Model.serialize(this.model), {})

      expect(m2.getMilestoneById(this.idm1).onCriticalPath).to.equal(true)
      expect(m2.getMilestoneById(this.idm2).onCriticalPath).to.equal(false)
      expect(m2.getLinkWithId(this.idl12).onCriticalPath).to.equal(true)
      expect(m2.getLinkWithId(this.idl23).onCriticalPath).to.equal(false)
    })

    it('when I add extra milestone to the model, highlight remains', function () {
      this.model.getMilestoneById(this.idm1).onCriticalPath = true
      this.model.getLinkWithId(this.idl12).onCriticalPath = true

      this.model.addMilestone(0, 0, "4");

      expect(this.model.getMilestoneById(this.idm1).onCriticalPath).to.equal(true)
      expect(this.model.getLinkWithId(this.idl12).onCriticalPath).to.equal(true)
    })

    it('when I add extra link to the model, highlight is cleared as critical path might be changed', function () {
      this.model.getMilestoneById(this.idm1).onCriticalPath = true
      this.model.getLinkWithId(this.idl12).onCriticalPath = true
      const idm4 =this.model.addMilestone(0, 0, "4");

      this.model.addLink(this.idm1, idm4, 14);

      expect(this.model.getMilestoneById(this.idm1).onCriticalPath).to.equal(false)
      expect(this.model.getLinkWithId(this.idl12).onCriticalPath).to.equal(false)
    })

    it('when I add remove a link from a model, highlight is cleared as critical path might be changed', function () {
      this.model.getMilestoneById(this.idm1).onCriticalPath = true
      this.model.getLinkWithId(this.idl12).onCriticalPath = true

      this.model.removeLink(this.idl23)

      expect(this.model.getMilestoneById(this.idm1).onCriticalPath).to.equal(false)
      expect(this.model.getLinkWithId(this.idl12).onCriticalPath).to.equal(false)
    })

    it('when I remove a milestone with a link from a model, highlight is cleared as critical path might be changed', function () {
      this.model.getMilestoneById(this.idm1).onCriticalPath = true
      this.model.getLinkWithId(this.idl12).onCriticalPath = true
      const idm3 = this.model.getMilestoneById(this.idm3)

      this.model.removeMilestone(idm3)

      expect(this.model.getMilestoneById(this.idm1).onCriticalPath).to.equal(false)
      expect(this.model.getLinkWithId(this.idl12).onCriticalPath).to.equal(false)
    })

    it('when I update task lenght, highlight is cleared as critical path might be changed', function () {
      this.skip('too complex to test (or I am too lazy)')
      this.model.getMilestoneById(this.idm1).onCriticalPath = true
      this.model.getLinkWithId(this.idl12).onCriticalPath = true
      const idm3 = this.model.getMilestoneById(this.idm3)

      // To do

      expect(this.model.getMilestoneById(this.idm1).onCriticalPath).to.equal(false)
      expect(this.model.getLinkWithId(this.idl12).onCriticalPath).to.equal(false)
    })

  })

}