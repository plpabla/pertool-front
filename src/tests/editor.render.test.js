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
        // this.stage = sinon.createStubInstance(Konva.Stage);
        this.stage = new Konva.Stage({
            height: 600,
            width: 800,
            container: "canvas",
            draggable: false
        });
        this.onClickSpy = sinon.spy(Editor.prototype, "onClick");
        this.e = new Editor(this.stage);
    });

    afterEach(function() {
        this.onClickSpy.restore();
        this.stage.clear();
        // this.stage.clearCache();
        // this.stage.destroyChildren();
        // this.stage.destroy();
        // delete this.stage;
    });

    // it('can call render()', function() {
    //     this.skip("I'm not going to use this method directly");
    //     expect(() => {
    //         this.e.render();
    //     }).to.not.throw();
    // });

    // it('does not call Toolbox.draw()', function() {
    //     this.skip("I'm not going to use this method directly");
    //     const spy = sinon.stub(Toolbox.prototype, 'draw').callsFake(()=>{});

    //     this.e.render();

    //     sinon.assert.notCalled(spy);
    // });

    it('when loaded, one click is trigerred (initial cursor selection)', function() {
        expect(this.onClickSpy.callCount).to.equal(1);
    });

    ["cursor", "milestone", "link", "fake-link"].forEach(function(name) {
        it('when clicked on ' + name + ', onMenuItemChange() is called with target "' + name + '"', function() {
            const menu = this.e.toolbox.menuItems;
            const menuItem = menu.find((item)=>item.name === name);

            menuItem.border.fire('click');
    
            expect(this.onClickSpy.callCount).to.equal(2);
            const callParam = this.onClickSpy.secondCall;
            const target = callParam.args[0].target;
            const clickedItem = target.attrs.name;
            expect(clickedItem).to.equal(name);
        });
    });


};