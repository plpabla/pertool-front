const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Editor from '../Editor';
import Konva from 'konva';
import sinon from 'sinon';
import PointerState from '../states/Pointer';
import MilestoneState from '../states/Milestone';

export default function suite() {
    beforeEach(function() {
        this.stage = sinon.createStubInstance(Konva.Stage);
        this.e = new Editor(this.stage);
        this.e.toolbox.menuItems.forEach((item)=>{
            item.border.on('click', this.e.onClick);
        });
    });

    it('starts with pointer state', function() {
        expect(this.e).to.have.property('state');
        expect(this.e.state).instanceOf(PointerState);
    });

    it('when clicked on milestone item, milestone state is set', function() {
        const menu = this.e.toolbox.menuItems;
        const milestone = menu.find((item)=>item.name === "milestone");

        milestone.border.fire('click');

        expect(this.e.state).instanceOf(MilestoneState);
    });
};