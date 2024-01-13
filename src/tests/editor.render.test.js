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
        this.onMenuItemChangeSpy = sinon.spy(Editor.prototype, "onMenuItemChange");
        this.e = new Editor(this.stage);
    });

    afterEach(function() {
        this.onMenuItemChangeSpy.restore();
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

    ["cursor", "milestone", "link", "fake-link"].forEach(function(name) {
        it('when clicked on ' + name + ', onMenuItemChange() is called with target "' + name + '"', function() {
            const menu = this.e.toolbox.menuItems;
            const cursor = menu.find((item)=>item.name === name);
    
            cursor.border.fire('click');
    
            expect(this.onMenuItemChangeSpy.callCount).to.equal(1);
            const callParam = this.onMenuItemChangeSpy.firstCall;
            const target = callParam.args[0].target;
            const clickedItem = target.attrs.menuItemName;
            expect(clickedItem).to.equal(name);
        });
    });


};