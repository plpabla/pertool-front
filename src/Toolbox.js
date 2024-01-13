import GraphicalElement from "./GraphicalElement";
// import Konva from 'konva';
import Milestone from "./Milestone";

class Toolbox extends GraphicalElement {
    constructor(layer) {
        super();
        this.layer = layer;
        // const stage = this.layer.getStage();
        this.menuItems = [];
        this.param = {  "stageWidth": layer.canvas.width,
                        "stageHeight": layer.canvas.height,
                        "menuItemWidth": 64,
                        "menuItemHeight": 64,
                        "paddingX": 10,
                        "paddingY": 10,
                        "mainColor": '#D243F7',             // '#D243F7'
                        "secondaryColor": "#0af0c0"}
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
            stroke: this.param.secondaryColor,
            strokeWidth: 2,
            strokeEnabled: false,
            opacity: 1,
            menuItemName: name
        });

        // console.log(`Adding item ${name} at pos (${x}, ${y})`);
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

        this.createMenuField(this.param.paddingX, y, "cursor", this.createImgCursor());
        shiftY();        
        this.createMenuField(this.param.paddingX, y, "milestone", this.createImgMilestone());
        shiftY();
        this.createMenuField(this.param.paddingX, y, "link", this.createImgArrow());
        shiftY();
        this.createMenuField(this.param.paddingX, y, "fake-link", this.createImgArrowDashed());
        shiftY();

        // Select first item
        this.menuItems[0].border.fire('click');

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

    createImgCursor() {
        return new Konva.Path({
            x: 0,
            y: 0,
            data: 'M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52z',
            fill: this.param.mainColor,
            scaleX: 4,
            scaleY: 4,
          });
    }

    createImgMilestone() {
        const m = new Milestone(32,32,"");
        return changeLineColor(m.img, this.param.mainColor);
        
        function changeLineColor(img, color) {
            img.children.forEach(e => {
                if(e instanceof(Konva.Line)) {
                    e.stroke(color);
                }
            })
            return img;
        }
    }

    createImgArrow() {
        return new Konva.Arrow({
            x: 0,
            y: 0,
            points: [this.param.menuItemWidth*0.1, this.param.menuItemHeight*0.9, this.param.menuItemWidth*0.9, this.param.menuItemHeight*0.1],
            stroke: this.param.mainColor,
            fill: this.param.mainColor,
            strokeWidth: 4,
        })
    }

    createImgArrowDashed() {
        const a = this.createImgArrow();
        a.dash([5, 3]);
        return a;
    }

    createImgPlaceholder() {
        return new Konva.Text({
            x: 0,
            y: 0,
            text: "TO DO\n!!!",
            fontSize: 22,
            fontFamily: 'Calibri',
            fill: this.param.mainColor
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