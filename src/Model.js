import Milestone from './Milestone.js';

class Model {
    constructor() {
        this.root = new Milestone();
        this.milestones = [this.root];
    }

    getRoot() {
        return this.root;
    }
}

export default Model;