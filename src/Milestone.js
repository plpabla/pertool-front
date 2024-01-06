const Konva = require('konva');
import GraphicalElement from "./GraphicalElement";

class Milestone extends GraphicalElement {
    constructor(x,y,name) {
        super();
        this.name = name;
        this.sourceLinks = [];
        this.destinationLinks = [];
        this.img = Milestone.createImg(x,y);
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

    getPos() {
        const pos = this.img.absolutePosition();
        return [pos.x, pos.y];
    }

    static createImg(x, y) {
        const r = 30;
        const c = new Konva.Circle({
            x: 0,
            y: 0,
            fill: "white",
            stroke: "black",
            radius: r
        })
    
        const l1 = new Konva.Line({
            points: [-Math.sin(Math.PI/4)*r, -Math.cos(Math.PI/4)*r, Math.sin(Math.PI/4)*r, Math.cos(Math.PI/4)*r],
            stroke: "red"
        })
        const l2 = new Konva.Line({
            points: [Math.sin(Math.PI/4)*r, -Math.cos(Math.PI/4)*r, -Math.sin(Math.PI/4)*r, Math.cos(Math.PI/4)*r],
            stroke: "red"
        })
    
        const txt = new Konva.Text({
            x: 0,
            fontSize: 16,
            y: -0.7*r,
            text: this.name
        })
        // Center
        txt.offsetX(txt.width() / 2);
    
        const img = new Konva.Group({
            x: x,
            y: y,
            draggable: true
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
        deserialized.img = Milestone.createImg(pos[0],pos[1]);
        return deserialized;
    }
}

export default Milestone;