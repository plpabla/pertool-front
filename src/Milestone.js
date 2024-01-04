import GraphicalElement from "./GraphicalElement";

class Milestone extends GraphicalElement {
    constructor(name) {
        super();
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

    draw() {
        // TODO
    }
}

export default Milestone;