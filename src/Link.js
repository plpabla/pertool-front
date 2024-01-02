class Link {
    constructor(m1, m2) {
        this.sourceId = m1.getId();
        this.destId = m2.getId();
        m1.addLinkTo(this);
        m2.addLinkFrom(this);
    }

    getSourceMilestoneId() {
        return this.sourceId;
    }

    getDestinationMilestoneId() {
        return this.destId;
    }
}

export default Link;