class Milestone {
    constructor(name) {
        this.name = name;
        this.sourceLinks = [];
        this.destinationLinks = [];
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
}

export default Milestone;