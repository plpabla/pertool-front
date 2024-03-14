const Konva = require('konva');

class Milestone {
    static _id = 0;

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

    getImg() {
        return this._img;
    }

    getPos() {
        // const pos = this._img.absolutePosition();
        const pos = this._img.position();
        return [pos.x, pos.y];
    }

    getDescriptionPosition() {
        const txtElement = this._img.findOne(".milestone-description-field");
        const pos = txtElement.position();
        return [pos.x, pos.y];
    }

    setDescriptionPosition(pos) {
        const txtElement = this._img.findOne(".milestone-description-field");
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

    static radius = 27;   // as used outside the class

    static _param = { "name": "milestone-element",
    "mainColor": "black", 
    "secondaryColor": "#D243F7",
    "width": 2,
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
            destinationLinks: obj.destinationLinks
        }

        const str = JSON.stringify(serializeObj);
        
        return str;
    }

    static deserialize(str, parentModel) {
        const deserialized_data = JSON.parse(str);

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
        m._createCallbackOnMove();

        return m;
    }

    static getFormItems() {
        return [{
            label: "Milestone ID",
            key: "name",
            default: ""
        }, {
            label: "Description",
            key: "text",
            default: "",
            focus: true
        }];
    }
}

export default Milestone;