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
        this.t = new Toolbox(this.layer);
    })

    it('uses Konva layer to be drawn at', function() {
        expect(this.t.layer).instanceOf(Konva.Layer);
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
}