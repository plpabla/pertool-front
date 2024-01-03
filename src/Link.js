class Link {
    constructor(sourceId, destId) {
        this.sourceId = sourceId;
        this.destId = destId;
    }

    getSourceMilestoneId() {
        return this.sourceId;
    }

    getDestinationMilestoneId() {
        return this.destId;
    }
}

export default Link;