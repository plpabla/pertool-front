const Konva = require('konva');

class Milestone {
    static _id = 0;
    #tmin = null;
    #tmax = null;
    #tbuffer = null;
    #onCriticalPath = false;

    constructor(x,y,name,description,model) {
        this.id = Milestone._id++;
        this.name = name;
        this.description = description;
        this.sourceLinks = new Array();
        this.destinationLinks = new Array();
        this._img = Milestone.createImg(x, y, name, description, this);
        this.parentModel = model;
        this._createCallbackOnMove();
    }

    get onCriticalPath() {
        return this.#onCriticalPath
    }

    set onCriticalPath(val) {
        if(this.#onCriticalPath !== val) {
            if(typeof val === "boolean") {
                this.#onCriticalPath = val
                this.#highlightIfOnCriticalPath(val)
            }
        }
    }

    _createCallbackOnMove() {
        this._img.on('dragmove', (e) => {
            this.parentModel.onDrag(this);
        });
    }

    addLinkWhereIAmDestination(l) {
        this.destinationLinks.push(l);
    }

    addLinkWhereIAmSource(l) {
        this.sourceLinks.push(l);
    }

    removeLink(l) {
        let idx = this.destinationLinks.indexOf(l);
        if(idx>=0) {
            this.destinationLinks.splice(idx, 1);
        }
        idx = this.sourceLinks.indexOf(l);
        if(idx>=0) {
            this.sourceLinks.splice(idx, 1);
        }
    }

    destroy() {
        this._img.destroy();
    }

    getDescription() {
        return this.description;
    }

    setDescription(descr) {
        this.description = descr;
        const txtElement = this._img.findOne(".milestone-description-field");
        if(txtElement) {
            txtElement.text(this.description);
            txtElement.offsetX(txtElement.width() / 2);
        }
    }
    
    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
        const txtElement = this._img.findOne(".milestone-name-field");
        if(txtElement) {
            txtElement.text(this.name);
            txtElement.offsetX(txtElement.width() / 2);
        }
    }

    getId() {
        return this.id;
    }

    getTmin() {
        return this.#tmin;
    }

    setTmin(t) {
        const tnum = t===null ? null : Number(t);
        if(Number.isFinite(tnum)) {
            this.#tmin = tnum;
            const tminTxt = this._getGraphicalElement("milestone-tmin-field");
            tminTxt.text(this.#tmin);
            tminTxt.align();
        } else {
            this.#tmin = null;
        }
    }

    getTmax() {
        return this.#tmax;
    }

    setTmax(t) {
        const tnum = t===null ? null : Number(t);
        if(Number.isFinite(tnum)) {
            this.#tmax = tnum;
            const tmaxTxt = this._getGraphicalElement("milestone-tmax-field");
            tmaxTxt.text(this.#tmax);
            tmaxTxt.align();
        } else {
            this.#tmax = null;
        }
    }

    getTbuffer() {
        return this.#tbuffer;
    }

    setTbuffer(t) {
        const tnum = t===null ? null : Number(t);
        if(Number.isFinite(tnum)) {
            this.#tbuffer = tnum;
            const tbuffTxt = this._getGraphicalElement("milestone-tbuff-field");
            tbuffTxt.text(this.#tbuffer);
            tbuffTxt.align();
        } else {
            this.#tbuffer = null;
        }
    }

    clearTimes() {
        this.#tmax = null;
        this.#tmin = null;
        this.#tbuffer = null;
        const tmaxTxt = this._getGraphicalElement("milestone-tmin-field");
        tmaxTxt.text("");
        const tminTxt = this._getGraphicalElement("milestone-tmax-field");
        tminTxt.text("");
        const tbuffTxt = this._getGraphicalElement("milestone-tbuff-field");
        tbuffTxt.text("");
    }

    getImg() {
        return this._img;
    }

    getPos() {
        // const pos = this._img.absolutePosition();
        const pos = this._img.position();
        return [pos.x, pos.y];
    }

    _getGraphicalElement(name) {
        return this._img.findOne("."+name);
    }

    getDescriptionPosition() {
        const txtElement = this._getGraphicalElement("milestone-description-field");
        const pos = txtElement.position();
        return [pos.x, pos.y];
    }

    setDescriptionPosition(pos) {
        const txtElement = this._getGraphicalElement("milestone-description-field");
        txtElement.x(pos[0]);
        txtElement.y(pos[1]);
    }

    focus(enable) {
        const c = this._getElement("Circle");
        c.strokeWidth(enable ? Milestone._param.focusedWidth : Milestone._param.width);
    }

    _getElement(name) {
        const el = this._img.getChildren(function(n) {
            if (n.getClassName()===name) return n;
        });
        return el[0];
    }

    #highlightIfOnCriticalPath(enable) {
        const c = this._getElement("Circle");
        c.stroke(enable ? Milestone._param.onCriticalPathColor : Milestone._param.mainColor);
        c.strokeWidth(enable ? Milestone._param.onCriticalPathWidth : Milestone._param.width);
    }

    static radius = 27;   // as used outside the class

    static _param = { "name": "milestone-element",
    "mainColor": "black", 
    "secondaryColor": "#D243F7",
    "onCriticalPathColor": "#D243F7",
    "width": 2,
    "onCriticalPathWidth": 3,
    "focusedWidth": 5,
    "radius": Milestone.radius};

    static createImg(x, y, name, description, instance) {
        const r = Milestone._param.radius;
        const c = new Konva.Circle({
            x: 0,
            y: 0,
            fill: "white",
            stroke: Milestone._param.mainColor,
            radius: r,
            name: Milestone._param.name
        })
    
        const l1 = new Konva.Line({
            points: [-Math.sin(Math.PI/4)*r, -Math.cos(Math.PI/4)*r, Math.sin(Math.PI/4)*r, Math.cos(Math.PI/4)*r],
            stroke: Milestone._param.secondaryColor,
            name: Milestone._param.name,
        })
        const l2 = new Konva.Line({
            points: [Math.sin(Math.PI/4)*r, -Math.cos(Math.PI/4)*r, -Math.sin(Math.PI/4)*r, Math.cos(Math.PI/4)*r],
            stroke: Milestone._param.secondaryColor,
            name: Milestone._param.name,
        })
    
        const txt = new Konva.Text({
            x: 0,
            fontSize: 16,
            y: -0.7*r,
            text: name,
            name: Milestone._param.name,
        })
        txt.addName("milestone-name-field");
        // Center
        txt.offsetX(txt.width() / 2);

        const tminTxt = new Konva.Text({
            x: 0,
            y: 0,
            fontSize: 14,
            text: "50",
            name: Milestone._param.name,
        })
        tminTxt.addName("milestone-tmin-field");
        tminTxt.align = function() {
            this.offsetX(0.9*r);
            this.offsetY(this.height() / 2);
        };
        tminTxt.align();
        tminTxt.text("");

        const tmaxTxt = new Konva.Text({
            x: 0,
            y: 0,
            fontSize: 14,
            text: "50",
            name: Milestone._param.name,
        })
        tmaxTxt.addName("milestone-tmax-field");
        tmaxTxt.align = function() {
            this.offsetX(-0.9*r+this.width());
            this.offsetY(this.height() / 2);
        };
        tmaxTxt.align();
        tmaxTxt.text("");

        const tbuffTxt = new Konva.Text({
            x: 0,
            y: 0,
            fontSize: 14,
            text: "50",
            name: Milestone._param.name,
        })
        tbuffTxt.addName("milestone-tbuff-field");
        tbuffTxt.align = function() {
            this.offsetX(this.width() / 2);
            this.offsetY(-0.4*r);
        };
        tbuffTxt.align();
        tbuffTxt.text("");
    
        const img = new Konva.Group({
            x: x,
            y: y,
            draggable: true,
            objInstance: instance
        })
    
        img.add(c);
        img.add(l1);
        img.add(l2);
        img.add(txt);
        img.add(tminTxt);
        img.add(tmaxTxt);
        img.add(tbuffTxt);

        if(!description) 
        {
            description="";
        }

        const txtDescr = new Konva.Text({
            x: 0,
            fontSize: 16,
            y: 1.2*r,
            text: description,
        })
        // Center
        txtDescr.offsetX(txtDescr.width() / 2);
        txtDescr.addName("milestone-description-field");
        txtDescr.draggable(true);
        img.add(txtDescr);

        return img;
    }

    static serialize(obj) {
        const serializeObj = {
            position: obj.getPos(),
            descriptionPos: obj.getDescriptionPosition(),
            id: obj.id,
            name: obj.name,
            description: obj.description,
            sourceLinks: obj.sourceLinks,
            destinationLinks: obj.destinationLinks,
            onCriticalPath: obj.onCriticalPath,
            timing: {
                tmin: obj.getTmin(),
                tmax: obj.getTmax(),
                tbuf: obj.getTbuffer()
            }
        }
        return serializeObj;
    }

    static deserialize(deserialized_data, parentModel) {
        // Create a new milestone
        const m = new Milestone(
            deserialized_data.position[0], 
            deserialized_data.position[1],
            deserialized_data.name, 
            deserialized_data.description, 
            parentModel);
        m.id = deserialized_data.id;
        m.sourceLinks = [...deserialized_data.sourceLinks];
        m.destinationLinks = [...deserialized_data.destinationLinks];
        m._img = Milestone.createImg(
            deserialized_data.position[0], 
            deserialized_data.position[1],
            deserialized_data.name, 
            deserialized_data.description, 
            m);
        m.setDescriptionPosition(deserialized_data.descriptionPos);
        const timing = deserialized_data.timing;
        m.setTmin(timing.tmin);
        m.setTmax(timing.tmax);
        m.setTbuffer(timing.tbuf);
        m.onCriticalPath = deserialized_data.onCriticalPath;
        m._createCallbackOnMove();

        return m;
    }

    static getFormItems() {
        return [ {
            label: "Description",
            key: "text",
            default: "",
            focus: true
        }];
    }
}

export default Milestone;