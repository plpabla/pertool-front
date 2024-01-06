const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Toolbox from '../Toolbox';
import Milestone from '../Milestone';
import Konva from 'konva';
// import sinon from 'sinon';

export default function suite() {
    beforeEach(function() {
        this.t = new Toolbox(new Konva.Layer());
    })

    // it('uses Milestone.draw()', function() {
    //     sinon.stub(Milestone.prototype, 'draw').callsFake(()=>'called');

    //     this.t.draw();

    //     sinon.assert.calledOnce(Milestone.prototype.draw);
    // });
}