import GraphicalElement from "./GraphicalElement";
// import Konva from 'konva';
import Milestone from "./Milestone";

class Toolbox extends GraphicalElement {
    constructor(layer) {
        super();
        this.layer = layer;
        const stage = this.layer.getStage();
        this.menuItems = [];
        this.param = {  "stageWidth": stage.width(),
                        "stageHeight": stage.height(),
                        "menuItemWidth": 64,
                        "menuItemHeight": 64,
                        "paddingX": 10,
                        "paddingY": 10}
        this.draw();
    }

    draw() {
        this.createMenuItems();
        this.drawBorder();
        this.menuItems.forEach(el => {
            this.layer.add(el.img);
            this.layer.add(el.border);
        })
    }

    drawBorder() {
        const border = new Konva.Rect({
            x:0,
            y:0,
            width: this.param.menuItemWidth + 2*this.param.paddingX,
            height: this.param.stageHeight,
            stroke: "black",
            fill: "#E6FEF9",
            strokeWidth: 0,
        });
        this.layer.add(border);
    }

    createMenuField(x, y, name, img) {
        const border = new Konva.Rect({
            x:x,
            y:y,
            width: this.param.menuItemWidth,
            height: this.param.menuItemHeight,
            fill: null,
            stroke: "#0af0c0",
            strokeWidth: 2,
            strokeEnabled: false,
            opacity: 1,
        });

        console.log(`Adding item ${name} at pos (${x}, ${y})`);
        border.on('click', (e) => {
            this.menuItems.forEach(item => item.border.strokeEnabled(false));
            const item = e.currentTarget;
            item.strokeEnabled(true);
        });
        const item = {
            "border": border,
            "img": img.move({x: x, y: y}),
            "name": name
        }

        this.menuItems.push(item);
    }

    createMenuItems() {
        const this_ = this;   // will be used for closure
        this.menuItems = [];
        let y = this.param.paddingY;

        this.createMenuField(this.param.paddingX, y, "cursor", this.createImgPlaceholder());
        shiftY();        
        this.createMenuField(this.param.paddingX, y, "milestone", this.createImgMilestone());
        shiftY();
        this.createMenuField(this.param.paddingX, y, "link", this.createImgPlaceholder());
        shiftY();
        this.createMenuField(this.param.paddingX, y, "fake-link", this.createImgPlaceholder());
        shiftY();

        function shiftY() {
            y += this_.param.menuItemHeight + this_.param.paddingY;
        }
    }

    bind(menuItemName, callback) {
        const el = this.menuItems.find((item)=>item.name === menuItemName);
        if(el) {
            el.border.on('click', callback);
        }
    }

    createImgMilestone() {
        const m = new Milestone(32,32,"");
        return m.img;
    }

    createImgPlaceholder() {
        return new Konva.Text({
            x: 0,
            y: 0,
            text: "TO DO\n!!!",
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: '#D243F7'
        });
    }




    createMenuItemsObsolete(args) {
        const BUBBLE_WIDTH = 70;
        const PADDING_X = 10;
        const PADDING_Y = 20;
        const MARGIN_Y = PADDING_Y;
        const POS_X = (BUBBLE_WIDTH + 2*PADDING_X)/2;
        const ARROW_WIDTH = BUBBLE_WIDTH;
        const ARROW_HEIGHT = BUBBLE_WIDTH/2;
        const LEGEND_HEIGHT = 500;
        let posY = BUBBLE_WIDTH/2 + MARGIN_Y;
        this.graphicalElements = [];

        const border = new Konva.Rect({
            x:2,
            y:2,
            width: BUBBLE_WIDTH + 2*PADDING_X,
            height: LEGEND_HEIGHT,
            stroke: "black",
            fill: "lightblue",
            strokeWidth: 2
        });
        this.graphicalElements.push(border);

        const m = new Milestone(POS_X,posY,"");
        posY += BUBBLE_WIDTH/2 + PADDING_Y;
        const mImg = m.getImg();
        mImg.draggable(false);
        mImg.on('click', this.clickOnMilestone);
        // this.menuElements['milestone'] = mImg;
        this.graphicalElements.push(mImg);

        const arrowBorders = [POS_X-ARROW_WIDTH/2, posY+ARROW_HEIGHT, POS_X+ARROW_WIDTH/2, posY];
        const l = new Konva.Arrow({
            points: arrowBorders,
            stroke: "black",
            strokeWidth: 4
        });
        const arrowBorder = new Konva.Rect({
            x:arrowBorders[0],
            y:arrowBorders[3],
            width: ARROW_WIDTH,
            height: ARROW_HEIGHT,
        });
        // this.menuElements['link'] = arrowBorder;
        this.graphicalElements.push(arrowBorder);
        this.graphicalElements.push(l);
        posY +=  ARROW_HEIGHT + PADDING_Y;
    }
}

export default Toolbox;