const Konva = require('konva');

class Link {
    static _id = 0;
    constructor(sourceId, destId, taskLength, points) {
        this.id = Link._id++;
        this.sourceId = sourceId;
        this.destId = destId;
        this.points = points;
        this.taskLength = taskLength ? parseFloat(taskLength) : 0;
        this._img = Link.createImg(this.points, this.taskLength, this);
        this._updateDash();
    }

    getSourceMilestoneId() {
        return this.sourceId;
    }

    getDestinationMilestoneId() {
        return this.destId;
    }

    getId() {
        return this.id;
    }

    getTaskLength() {
        return this.taskLength;
    }

    setTaskLength(taskLength) {
        this.taskLength = taskLength ? parseFloat(taskLength) : 0;
        this._updateTaskLenStr();
        this._updateDash();
    }

    focus(enable) {
        const arrow = this._getArrow();
        if (enable) {
            arrow.strokeWidth(Link._param.focusedWidth);
        } else {
            arrow.strokeWidth(Link._param.strokeWidth);
        }
    }

    destroy() {
        this._img.destroy();
    }

    static _param = {
            "name": "link-element",
            "mainColor": "black",
            "strokeWidth": 2,
            "hitStrokeWidth": 8,            // when hit is detected
            "focusedWidth": 5,
            "pointerLength": 20,
            "pointerWidth": 15,
            "dash": [10, 5],
            "fontSize": 20,
            "backgroundColor": "#fef9e6",
            "backgroundPadding": "3"
        };

    static createImg(points, taskLength, instance) {
        
        const img = new Konva.Group({
            objInstance: instance
        });

        const arrow = new Konva.Arrow({
            points: points,
            stroke: Link._param.mainColor,
            strokeWidth: Link._param.strokeWidth,
            hitStrokeWidth: Link._param.hitStrokeWidth,
            fill: Link._param.mainColor,
            pointerLength: Link._param.pointerLength,
            pointerWidth: Link._param.pointerWidth,
            dashEnabled: false,
            dash: Link._param.dash,
            name: Link._param.name,
        });
        

        const taskLenStr = taskLength || "";
        const txtX = (points[2] + points[0])/2;
        const txtY = (points[3] + points[1])/2;
        const txt = new Konva.Text({
            x: txtX,
            y: txtY,
            fontSize: Link._param.fontSize,
            text: taskLenStr,
            name: Link._param.name,
        })
        // Center
        const shiftX = txt.width() / 2;
        const shiftY = txt.height() / 2;
        txt.offsetX(shiftX);
        txt.offsetY(shiftY);

        const bgRect = new Konva.Rect({
            x: txtX-shiftX-Link._param.backgroundPadding,
            y: txtY-shiftY-Link._param.backgroundPadding,
            width: txt.width()+2*Link._param.backgroundPadding,
            height: txt.height()+2*Link._param.backgroundPadding,
            fill: Link._param.backgroundColor,
            name: Link._param.name,
          });
        if(!taskLenStr) {
            bgRect.hide();
        }

        img.add(arrow);
        img.add(bgRect);
        img.add(txt);
        
        return img;
    }

    static getFormItems() {
            return [{
                label: "Task lenght",
                key: "taskLen",
                default: "0"
            }];
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

    _getRect() {
        return this._getElement("Rect");
    }

    _updateTaskLenStr() {
        const taskLenStr = this.taskLength || "";
        updateTxt(this._getTxt(), taskLenStr, this.points);
        updateBoundingRect(this._getTxt(), this._getRect(), taskLenStr);

        function updateTxt(txt, taskLenStr, points) {
            txt.text(taskLenStr);
    
            const pos = {
                x: (points[2] + points[0])/2,
                y: (points[3] + points[1])/2
            }
            txt.position(pos);
            const shiftX = txt.width() / 2;
            const shiftY = txt.height() / 2; 
            txt.offsetX(shiftX);
            txt.offsetY(shiftY);
        }
        
        function updateBoundingRect(txt, rect, taskLenStr) {
            const pos = txt.position();
            const shiftX = txt.width() / 2;
            const shiftY = txt.height() / 2; 
            const pos2 = {
                x: pos.x - shiftX - Link._param.backgroundPadding,
                y: pos.y - shiftY - Link._param.backgroundPadding
            }
            rect.position(pos2);
            rect.width(txt.width()+2*Link._param.backgroundPadding);
            rect.height(txt.height()+2*Link._param.backgroundPadding);

            if(taskLenStr) {
                rect.show();
            } else {
                rect.hide();
            }
        }
    }

    setPosition(x1, y1, x2, y2) {
        this.points = [x1, y1, x2, y2];
        this._getArrow().attrs.points[0] = x1;
        this._getArrow().attrs.points[1] = y1;
        this._getArrow().attrs.points[2] = x2;
        this._getArrow().attrs.points[3] = y2;
        this._updateTaskLenStr();
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

    _updateDash() {
        this._getArrow().dashEnabled(this.taskLength === 0);
    }

    static serialize(obj) {
        const serializeObj = {
            id: obj.id,
            sourceId: obj.sourceId,
            destId: obj.destId,
            points: obj.points,
            taskLength: obj.taskLength
        }
        return serializeObj;
    }

    static deserialize(deserialized_data) {
        const deserialized = new Link(
            deserialized_data.sourceId, 
            deserialized_data.destId, 
            deserialized_data.taskLength, 
            deserialized_data.points);
        deserialized.id = deserialized_data.id;
        deserialized._img = Link.createImg(deserialized.points, deserialized.taskLength, deserialized);
        deserialized._updateDash();
        return deserialized;
    }
}

export default Link;