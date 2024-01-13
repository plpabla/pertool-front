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

    afterEach(function() {
    })

    it('can call render()', function() {
        this.skip("I'm not going to use this method directly");
        expect(() => {
            this.e.render();
        }).to.not.throw();
    });

    it('does not call Toolbox.draw()', function() {
        this.skip("I'm not going to use this method directly");
        const spy = sinon.stub(Toolbox.prototype, 'draw').callsFake(()=>{});

        this.e.render();

        sinon.assert.notCalled(spy);
    });

};