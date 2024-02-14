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
        this.img = Link.createImg(this.points);
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

    setPosition(x1, y1, x2, y2) {
        this.points = [x1, y1, x2, y2];
        this.img.attrs.points[0] = x1;
        this.img.attrs.points[1] = y1;
        this.img.attrs.points[2] = x2;
        this.img.attrs.points[3] = y2;
    }

    static createImg(points) {
        return new Konva.Arrow({
            points: points,
            stroke: "black",
            dashEnabled: false,
            dash: [10, 5]
        })
    }

    getImg() {
        return this.img;
    }

    updateDash() {
        this.img.dashEnabled(this.taskLength === 0);
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