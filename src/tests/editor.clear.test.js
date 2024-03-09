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

export default function suite() {
    beforeEach(function() {
        this.stage = sinon.createStubInstance(Konva.Stage);
        this.e = new Editor(this.stage);
    });

    it('after calling clear, state is set to Pointer', function() {
        this.e.state = new MilestoneState(this.e);

        this.e.clear();

        expect(this.e.state).instanceOf(PointerState);
    });

};