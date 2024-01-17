const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Editor from '../Editor';
import Toolbox from '../Toolbox';
import Model from '../Model';
import Konva from 'konva';
import sinon from 'sinon';

export default function suite() {
    let lastOnClickCallArg = undefined;
    beforeEach(function() {
        this.stage = sinon.createStubInstance(Konva.Stage);
        
        this.onClickStub = sinon.stub(Editor.prototype, "makeOnClicker");
        this.onClickStub.returns(function(e) {lastOnClickCallArg = e;});

        this.e = new Editor(this.stage);
        this.e.toolbox.menuItems.forEach((item)=>{
            item.border.on('click', this.e.makeOnClicker());
        });
    });

    afterEach(function() {
        this.onClickStub.restore();
    });

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

    it('when created, onClick fn creator is called 5 times (as we create Editor and have 4 items)', function() {
        expect(this.onClickStub.callCount).to.equal(5);
    });

    ["cursor", "milestone", "link", "fake-link"].forEach(function(name) {
        it('when clicked on ' + name + ', onMenuItemChange() is called with target "' + name + '"', function() {
            const menu = this.e.toolbox.menuItems;
            const menuItem = menu.find((item)=>item.name === name);

            menuItem.border.fire('click');

            const target = lastOnClickCallArg.target;
            const clickedItem = target.attrs.name;
            expect(clickedItem).to.equal(name);
        });
    });


};