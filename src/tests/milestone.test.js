const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Milestone from '../Milestone.js';

export default function suite() {
    beforeEach(function() {
        Milestone._id = 0;
        this.m = new Milestone(0, 0, "custom id", "custom descr");
    });

    it('has correct initial name', function() {
        expect(this.m.name).to.equal("custom id");
    });

    it('has correct initial description', function() {
        expect(this.m.description).to.equal("custom descr");
    });

    it('has no links attached', function() {
        expect(this.m.sourceLinks).to.length(0);
        expect(this.m.destinationLinks).to.length(0);
    });

    it('inherits img coordinates from parent class', function() {
        expect(this.m).to.have.property('_img');
    });

    it('has image', function() {
        expect(this.m.getImg()).to.be.not.null;
    });

    it('has id', function() {
        expect(this.m.getId()).to.equal(0);
    })

    it('has not set tmin when created', function() {
        expect(this.m.getTmin()).to.equal(null);
    });

    it('I can set tmin', function() {
        this.m.setTmin(0);

        expect(this.m.getTmin()).to.equal(0);
    });

    it('I can set tmin passed as a string', function() {
        this.m.setTmin("5.2");

        expect(this.m.getTmin()).to.equal(5.2);
    });

    it('Setting tmin updates graphical element', function() {
        this.m.setTmin("5.2");

        const el = this.m._getGraphicalElement("milestone-tmin-field");
        expect(el.text()).to.equal("5.2");
    });

    it('I cannot set non-numeric tmin', function() {
        this.m.setTmin("halo");

        expect(this.m.getTmin()).to.equal(null);
    });

    it('Setting tmax updates graphical element', function() {
        this.m.setTmax("1.2");

        const el = this.m._getGraphicalElement("milestone-tmax-field");
        expect(el.text()).to.equal("1.2");
    });

    it('clear clears all timers', function() {
        this.m.setTmin("1.2");
        this.m.setTmax("1.2");
        this.m.setTbuffer("1.2");

        this.m.clearTimes();

        expect(this.m.getTmin()).to.equal(null);
        expect(this.m.getTmax()).to.equal(null);
        expect(this.m.getTbuffer()).to.equal(null);
    });

    it('clear clears all timer graphical elements', function() {
        this.m.setTmin("1.2");
        this.m.setTmax("1.2");
        this.m.setTbuffer("1.2");

        this.m.clearTimes();

        const tmax = this.m._getGraphicalElement("milestone-tmax-field");
        expect(tmax.text()).to.equal("");
        const tmin = this.m._getGraphicalElement("milestone-tmin-field");
        expect(tmin.text()).to.equal("");
        const tb = this.m._getGraphicalElement("milestone-tbuff-field");
        expect(tb.text()).to.equal("");
    });

    it('Setting tbuff updates graphical element', function() {
        this.m.setTbuffer("0.5");

        const el = this.m._getGraphicalElement("milestone-tbuff-field");
        expect(el.text()).to.equal("0.5");
    });

    it('has not set tmax when created', function() {
        expect(this.m.getTmax()).to.equal(null);
    });

    it('has not set tbuffer when created', function() {
        expect(this.m.getTbuffer()).to.equal(null);
    });

    it('second created milestone has bigger id', function() {
        const m2 = new Milestone(0, 0, "custom id", "custom descr");

        expect(m2.getId()).greaterThan(this.m.getId());
    })
};