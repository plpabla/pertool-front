const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
import Toolbox from '../Toolbox';
import Konva from 'konva';
import sinon from 'sinon';

export default function suite() {
    before(function() {
        sinon.stub(Konva.Layer.prototype, 'getStage').callsFake(()=>{
            return{
                width: function() {return 100},
                height: function() {return 100}
            }
        });
        this.img = new Konva.Rect({
            x:0,
            y:0,
            width: 10,
            height: 10,
        });
    })

    beforeEach(function() {
        this.layer = new Konva.Layer();
        this.t = new Toolbox(this.layer, (e)=> {});
    })

    it('uses Konva layer to be drawn at', function() {
        expect(this.t.layer).instanceOf(Konva.Layer);
    });

    it('contains initially 4 fields', function() {
        expect(this.t.menuItems).length(4);
    });

    it('create menu field creates menu item', function() {
        this.t.menuItems = [];

        this.t.createMenuField(30, 50, "milestone", this.img);

        expect(this.t.menuItems).length(1);
    });

    it('created menu item is at given position with a given name', function() {
        this.t.menuItems = [];
        const posX = 30;
        const posY = 40;
        const w = 60;
        const h = 70;
        this.t.param.menuItemWidth = w;
        this.t.param.menuItemHeight = h;

        this.t.createMenuField(posX, posY, "milestone", this.img);

        const item = this.t.menuItems[0];
        expect(item.name).to.equal("milestone");
        expect(item.border).instanceOf(Konva.Rect);
        expect(item.border.getClientRect()).eqls({"x": posX, "y": posY, "width": w, "height" : h})
    });

    it('when created, pointer tool is selected', function() {
        const pointer = this.t.menuItems.find((item)=>item.name === "pointer");

        expect(pointer.border.strokeEnabled()).to.be.true;
    })

    it('when created, no other items than pointer are selected', function() {
        const pointer = this.t.menuItems.find((item)=>item.name === "pointer");

        this.t.menuItems.forEach(element => {
            if(element===pointer) return;
            expect(element.border.strokeEnabled()).to.be.false;
        });
    })


    it('when milestone is clicked, border on pointer is off', function() {
        const pointer = this.t.menuItems.find((item)=>item.name === "pointer");
        const milestone = this.t.menuItems.find((item)=>item.name === "milestone");

        milestone.border.fire('click');

        expect(pointer.border.strokeEnabled()).to.be.false;
    })

    it('when milestone is clicked, border on milestone is on', function() {
        const pointer = this.t.menuItems.find((item)=>item.name === "pointer");
        const milestone = this.t.menuItems.find((item)=>item.name === "milestone");

        milestone.border.fire('click');

        expect(milestone.border.strokeEnabled()).to.be.true;
    })

    it('created menu field border has property name with a given name so I can identify what was clicked', function() {
        const pointer = this.t.menuItems.find((item)=>item.name === "pointer");

        expect(pointer.border.attrs.name).to.equal("pointer");
    })
}