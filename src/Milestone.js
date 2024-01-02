class Milestone {
    static ID_COUNTER = 1;

    constructor(name) {
        this.name = name;
        this.linksFrom = [];
        this.linksTo = [];
        this.id = Milestone.ID_COUNTER++;
    }

    addLinkFrom(l) {
        this.linksFrom.push(l);
    }

    addLinkTo(l) {
        this.linksTo.push(l);
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}

export default Milestone;