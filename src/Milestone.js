const Konva = require('konva');

class Milestone {
    constructor(x,y,name,description,model) {
        this.name = name;
        this.description = description;
        this.sourceLinks = new Array();
        this.destinationLinks = new Array();
        this.img = Milestone.createImg(x, y, name, description, this);
        this.parentModel = model;
        this.img.on('dragmove', () => this.parentModel.onDrag(this));
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
    
    getName() {
        return this.name;
    }

    getImg() {
        return this.img;
    }

    getPos() {
        // const pos = this.img.absolutePosition();
        const pos = this.img.position();
        return [pos.x, pos.y];
    }

    focus(enable) {
        console.error("TODO");
    }

    static radius = 27;
    static createImg(x, y, name, description, instance) {
        const param = { "name": "milestone-element",
                        "mainColor": "black", 
                        "secondaryColor": "#D243F7",
                        "radius": Milestone.radius};

        const r = param.radius;
        const c = new Konva.Circle({
            x: 0,
            y: 0,
            fill: "white",
            stroke: param.mainColor,
            radius: r,
            name: param.name
        })
    
        const l1 = new Konva.Line({
            points: [-Math.sin(Math.PI/4)*r, -Math.cos(Math.PI/4)*r, Math.sin(Math.PI/4)*r, Math.cos(Math.PI/4)*r],
            stroke: param.secondaryColor,
            name: param.name,
        })
        const l2 = new Konva.Line({
            points: [Math.sin(Math.PI/4)*r, -Math.cos(Math.PI/4)*r, -Math.sin(Math.PI/4)*r, Math.cos(Math.PI/4)*r],
            stroke: param.secondaryColor,
            name: param.name,
        })
    
        const txt = new Konva.Text({
            x: 0,
            fontSize: 16,
            y: -0.7*r,
            text: name,
            name: param.name,
        })
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

        if(description) {
            const txtDescr = new Konva.Text({
                x: 0,
                fontSize: 16,
                y: 1.2*r,
                text: description,
            })
            // Center
            txtDescr.offsetX(txtDescr.width() / 2);
            img.add(txtDescr);
        }

        return img;
    }

    static serialize(obj) {
        obj.pos = obj.getPos();
        const img = obj.img;
        delete obj.img;
        const str = JSON.stringify(obj);

        // restore object state
        delete obj.pos;
        obj.img = img;
        
        return str;
    }

    static deserialize(str, parentModel) {
        // console.log(`deserialization of: ${str}`);
        const deserialized_data = JSON.parse(str);
        const deserialized = Object.create(Milestone.prototype, Object.getOwnPropertyDescriptors(deserialized_data));

        // recreate image
        const pos = deserialized.pos;
        delete deserialized.pos;
        deserialized.img = Milestone.createImg(pos[0],pos[1],deserialized.name,deserialized.description);
        deserialized.parentModel = parentModel;
        return deserialized;
    }
}

export default Milestone;