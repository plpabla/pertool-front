class Milestone {
    constructor(name) {
        this.name = name;
        this.linksFrom = [];
        this.linksTo = [];
    }

    addLinkFrom(l) {
        this.linksFrom.push(l);
    }

    addLinkTo(l) {
        this.linksTo.push(l);
    }
}

export default Milestone;