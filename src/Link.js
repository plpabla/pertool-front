const Konva = require('konva');

class Link {
    constructor(sourceId, destId, taskLength, points) {
        // TODO: create dashed link if length is zero
        this.sourceId = sourceId;
        this.destId = destId;
        this.points = points;
        this.taskLength = taskLength ? parseFloat(taskLength) : 0;
        if(points === undefined) {
            this.points = [1,2,3,4];
        }
        this._img = Link.createImg(this.points);
        this._getArrow();
        this.updateDash();
    }

    getSourceMilestoneId() {
        return this.sourceId;
    }

    getDestinationMilestoneId() {
        return this.destId;
    }

    getTaskLength() {
        return this.taskLength;
    }

    setTaskLength(taskLength) {
        this.taskLength = taskLength;
        this.updateDash();
    }

    static createImg(points) {
        const param = { 
            "name": "link-element",
            "mainColor": "black",
            "strokeWidth": 2,
            "pointerLength": 20,
            "pointerWidth": 15,
            "dash": [10, 5],
            "fontSize": 16
        };

        const img = new Konva.Group();
        const arrow = new Konva.Arrow({
            points: points,
            stroke: param.mainColor,
            strokeWidth: param.strokeWidth,
            fill: param.mainColor,
            pointerLength: param.pointerLength,
            pointerWidth: param.pointerWidth,
            dashEnabled: false,
            dash: param.dash,
            name: param.name,
        });

        const txt = new Konva.Text({
            x: 200,
            y: 200,
            fontSize: param.fontSize,
            text: "TODO",
            name: param.name,
        })
        // Center
        txt.offsetX(txt.width() / 2);

        img.add(txt);
        img.add(arrow);
        
        return img;
    }

    _getElement(name) {
        const el = this._img.getChildren(function(n) {
            if (n.getClassName()===name) return n;
        });
        return el[0];
    }
    _getArrow() {
        return this._getElement("Arrow");
    }

    _getTxt() {
        return this._getElement("Text");
    }

    setPosition(x1, y1, x2, y2) {
        this.points = [x1, y1, x2, y2];
        this._getArrow().attrs.points[0] = x1;
        this._getArrow().attrs.points[1] = y1;
        this._getArrow().attrs.points[2] = x2;
        this._getArrow().attrs.points[3] = y2;
    }

    getImg() {
        return this._img;
    }

    getPos() {
        return this._getArrow().attrs.points;
    }

    isDashEnabled() {
        return this._getArrow().dashEnabled();
    }

    updateDash() {
        this._getArrow().dashEnabled(this.taskLength === 0);
    }

    static serialize(obj) {
        const img = obj._img;
        delete obj._img;
        const str = JSON.stringify(obj);
        // restore after serialization
        obj._img = img;
        return str;
    }

    static deserialize(str) {
        const deserialized_data = JSON.parse(str);
        const deserialized = Object.create(Link.prototype, Object.getOwnPropertyDescriptors(deserialized_data));

        deserialized._img = Link.createImg();
        return deserialized;
    }
}

export default Link;