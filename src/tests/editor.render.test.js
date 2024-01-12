const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Editor from '../Editor';
import Toolbox from '../Toolbox';
import Model from '../Model';
import Konva from 'konva';
import sinon from 'sinon';

export default function suite() {
    beforeEach(function() {
        this.stage = sinon.createStubInstance(Konva.Stage);
        this.e = new Editor(this.stage);
    });

    it('can call render()', function() {
        expect(() => {
            this.e.render();
        }).to.not.throw();
    });

    it('does not call Toolbox.draw()', function() {
        const spy = sinon.stub(Toolbox.prototype, 'draw').callsFake(()=>{});

        this.e.render();

        sinon.assert.notCalled(spy);
    });

    it('when clicked on cursor, cursorCallback() is called', function() {
        // TODO
    })
};