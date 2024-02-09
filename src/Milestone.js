const Konva = require('konva');

class Milestone {
    constructor(x,y,name) {
        this.name = name;
        this.sourceLinks = [];
        this.destinationLinks = [];
        this.img = Milestone.createImg(x,y,name,this);
    }

    addLinkWhereIAmDestination(l) {
        this.destinationLinks.push(l);
    }

    addLinkWhereIAmSource(l) {
        this.sourceLinks.push(l);
    }

    getName() {
        return this.name;
    }

    getImg() {
        return this.img;
    }

    getPos() {
        const pos = this.img.absolutePosition();
        return [pos.x, pos.y];
    }

    onMove() {
        console.error(">>>> TODO");
    }

    static createImg(x, y, name, instance) {
        const param = { "name": "milestone-element",
                        "mainColor": "black", 
                        "secondaryColor": "red",
                        "radius": 30};

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

    static deserialize(str) {
        // console.log(`deserialization of: ${str}`);
        const deserialized_data = JSON.parse(str);
        const deserialized = Object.create(Milestone.prototype, Object.getOwnPropertyDescriptors(deserialized_data));

        // recreate image
        const pos = deserialized.pos;
        delete deserialized.pos;
        deserialized.img = Milestone.createImg(pos[0],pos[1],deserialized.name);
        return deserialized;
    }
}

export default Milestone;