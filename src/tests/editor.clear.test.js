const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Editor from '../Editor';
import Toolbox from '../Toolbox';
import Model from '../Model';
import Konva from 'konva';
import sinon from 'sinon';
import PointerState from '../states/PointerState';
import MilestoneState from '../states/MilestoneState';
import Milestone from '../Milestone';

export default function suite() {
    function createMilestone(editor, x, y, name, description) {
        editor.addMilestone(x,y,name,description);
        return editor.model.getMilestoneByName(name);
    }

    function createLink(editor, m1, m2, taskLen) {
        const id = editor.model.addLink(m1, m2, taskLen);
        return editor.model.getLinkWithId(id);
    }

    beforeEach(function() {
        this.stage = sinon.createStubInstance(Konva.Stage);
        this.e = new Editor(this.stage);
    });

    it('after calling clear, state is set to Pointer', function() {
        this.e.state = new MilestoneState(this.e);

        this.e.clear();

        expect(this.e.state).instanceOf(PointerState);
    });

    it('after calling cleal, only root milestone remains', function() {
        const m = createMilestone(this.e, 10, 20, "test");

        this.e.clear();

        expect(this.e.model.milestones.length).equal(1);
    });

    it('after calling cleal, no links are present', function() {
        createLink(this.e, createMilestone(this.e, 10, 20, "test"), createMilestone(this.e, 100, 20, "test2"), 2);

        this.e.clear();

        expect(this.e.model.links.length).equal(0);
    });
};