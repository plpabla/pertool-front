const Konva = require('konva');

class Milestone {
    constructor(x,y,name,description,model) {
        this.name = name;
        this.description = description;
        this.sourceLinks = new Array();
        this.destinationLinks = new Array();
        this._img = Milestone.createImg(x, y, name, description, this);
        this.parentModel = model;
        this._img.on('dragmove', () => this.parentModel.onDrag(this));
    }

    addLinkWhereIAmDestination(l) {
        this.destinationLinks.push(l);
    }

    addLinkWhereIAmSource(l) {
        this.sourceLinks.push(l);
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

    getImg() {
        return this._img;
    }

    getPos() {
        // const pos = this._img.absolutePosition();
        const pos = this._img.position();
        return [pos.x, pos.y];
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
            name: Milestone._param.name
        })
        // Center
        txtDescr.offsetX(txtDescr.width() / 2);
        txtDescr.addName("milestone-description-field");
        img.add(txtDescr);

        return img;
    }

    static serialize(obj) {
        obj.pos = obj.getPos();
        const img = obj._img;
        delete obj._img;
        const str = JSON.stringify(obj);

        // restore object state
        delete obj.pos;
        obj._img = img;
        
        return str;
    }

    static deserialize(str, parentModel) {
        // console.log(`deserialization of: ${str}`);
        const deserialized_data = JSON.parse(str);
        const deserialized = Object.create(Milestone.prototype, Object.getOwnPropertyDescriptors(deserialized_data));

        // recreate image
        const pos = deserialized.pos;
        delete deserialized.pos;
        deserialized._img = Milestone.createImg(pos[0],pos[1],deserialized.name,deserialized.description);
        deserialized.parentModel = parentModel;
        return deserialized;
    }
}

export default Milestone;