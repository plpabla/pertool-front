const Konva = require('konva');

class Link {
    constructor(sourceId, destId) {
        this.sourceId = sourceId;
        this.destId = destId;
        this.img = Link.createImg(sourceId, destId);
    }

    getSourceMilestoneId() {
        return this.sourceId;
    }

    getDestinationMilestoneId() {
        return this.destId;
    }

    static createImg(args) {
        return new Konva.Arrow({
            points: [1, 2, 3, 4],
            stroke: "black"
        })
    }

    getImg() {
        return this.img;
    }

    static serialize(obj) {
        const img = obj.img;
        delete obj.img;
        const str = JSON.stringify(obj);
        // restore after serialization
        obj.img = img;
        return str;
    }

    static deserialize(str) {
        const deserialized_data = JSON.parse(str);
        const deserialized = Object.create(Link.prototype, Object.getOwnPropertyDescriptors(deserialized_data));

        deserialized.img = Link.createImg();
        return deserialized;
    }
}

export default Link;