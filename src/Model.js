import Milestone from './Milestone.js';
import Link from './Link.js';

class Model {
    constructor() {
        this.root = new Milestone("root");
        this.milestones = [this.root];
        this.links = [];
    }

    getRoot() {
        return this.root;
    }

    addMilestone(name) {
        this.milestones.push(new Milestone(name));
    }

    getMilestoneByName(name) {
        return this.milestones.find(m => m.getName() === name);
    }

    getMilestoneById(id) {
        return this.milestones.find(m => m.getId() === id);
    }

    addLink(id1, id2) {
        let m1, m2 = undefined;
        if ((typeof id1)==='number') {
            m1 = this.getMilestoneById(id1);
            m2 = this.getMilestoneById(id2);
        } else {
            m1 = this.getMilestoneByName(id1);
            m2 = this.getMilestoneByName(id2);
        }

        if(m1 && m2) {
            this.links.push(new Link(m1, m2));
        }
    }
}

export default Model;