import GraphicalElement from "./GraphicalElement";

class Link extends GraphicalElement {
    constructor(sourceId, destId) {
        super();
        this.sourceId = sourceId;
        this.destId = destId;
    }

    getSourceMilestoneId() {
        return this.sourceId;
    }

    getDestinationMilestoneId() {
        return this.destId;
    }

    draw() {
        // TODO
    }
}

export default Link;