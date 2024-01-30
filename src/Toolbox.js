import Milestone from "./Milestone";

class Toolbox {
    constructor(layer) {
        this.layer = layer;
        // const stage = this.layer.getStage();
        this.menuItems = [];
        this.param = {  "stageWidth": layer.canvas.width,
                        "stageHeight": layer.canvas.height,
                        "menuItemWidth": 64,
                        "menuItemHeight": 64,
                        "paddingX": 10,
                        "paddingY": 20,
                        "mainColor": '#D243F7',             // '#D243F7'
                        "secondaryColor": "#0af0c0"}
        this.draw();
    }

    draw() {
        this.createMenuItems();
        this.drawBorder();
        this.menuItems.forEach(el => {
            this.layer.add(el.bottom);
            this.layer.add(el.img);
            this.layer.add(el.border);
        })
    }

    createMenuItems() {
        const this_ = this;   // will be used for closure
        this.menuItems = [];
        let y = this.param.paddingY;

        this.createMenuField(this.param.paddingX, y, "pointer", this.createImgPointer());
        shiftY();        
        this.createMenuField(this.param.paddingX, y, "milestone", this.createImgMilestone());
        shiftY();
        this.createMenuField(this.param.paddingX, y, "link", this.createImgArrow());
        shiftY();

        // Select first item
        this.menuItems[0].border.fire('click');

        function shiftY() {
            y += this_.param.menuItemHeight + this_.param.paddingY;
        }
    }

    createMenuField(x, y, name, img) {
        const bottomLayerForShadow = new Konva.Rect({
            x:x,
            y:y,
            width: this.param.menuItemWidth,
            height: this.param.menuItemHeight,
            stroke: this.param.secondaryColor,
            strokeWidth: 2,
            strokeEnabled: false,
            fill: '#E6FEF9',
            opacity: 1,
            name: name,
            shadowColor: 'black',
            shadowBlur: 15,
            shadowOffsetX: 5,
            shadowOffsetY: 5, 
            shadowOpacity: 1,
            shadowEnabled: false,
        });

        const border = new Konva.Rect({
            x:x,
            y:y,
            width: this.param.menuItemWidth,
            height: this.param.menuItemHeight,
            stroke: this.param.secondaryColor,
            strokeWidth: 2,
            strokeEnabled: false,
            fill: null,
            opacity: 1,
            name: name,
            bottomLayer: bottomLayerForShadow
        });

        // console.log(`Adding item ${name} at pos (${x}, ${y})`);
        border.on('click', (e) => {
            this.menuItems.forEach(item => {
                item.border.strokeEnabled(false);
                item.border.attrs.bottomLayer.shadowEnabled(false);
            });
            const item = e.currentTarget;
            item.strokeEnabled(true);
            item.attrs.bottomLayer.shadowEnabled(true);
        });

        const item = {
            "bottom": bottomLayerForShadow,
            "border": border,
            "img": img.move({x: x, y: y}),
            "name": name
        }

        this.menuItems.push(item);
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
            name: "toolbox",
            shadowColor: 'black',
            shadowBlur: 30,
            shadowOffsetX: 10,
            shadowOffsetY: 0, 
            shadowOpacity: 0.6,
            shadowEnabled: true,
        });
        this.layer.add(border);
    }

    select(name) {
        const item = this.menuItems.find((item) => {return item.name === name});
        if(item)
            item.border.fire('click');
    }

    // Not used as we bind events in the state machine by checking what is a "name" of clicked component
    // bind(menuItemName, callback) {
    //     const el = this.menuItems.find((item)=>item.name === menuItemName);
    //     if(el) {
    //         el.border.on('click', callback);
    //     }
    // }

    createImgPointer() {
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
}

export default Toolbox;