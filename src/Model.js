import Milestone from './Milestone.js';
import Link from './Link.js';

class Model {
    constructor() {
        this.milestones = [new Milestone(200, 300, "0")];
        this.links = [];
    }

    static serialize(obj) {
        // console.log('serialiation');
        // console.log(obj);
        const milestones = obj.milestones;
        const links = obj.links;

        obj.milestones = [];
        obj.links = [];
        milestones.forEach(m=>obj.milestones.push(Milestone.serialize(m)));
        links.forEach(l=>obj.links.push(Link.serialize(l)));

        const str = JSON.stringify(obj);
        // console.log('Serialized: ' + str);

        // restore original elements
        obj.milestones = milestones;
        obj.links = links;
        return str;
    }

    static deserialize(str) {
        // console.log('String to deserialize: ' + str)
        const deserialized_data = JSON.parse(str);
        const deserialized = Object.create(Model.prototype, Object.getOwnPropertyDescriptors(deserialized_data));

        const milestones = [];
        const links = [];
        deserialized.milestones.forEach(element => {
            milestones.push(Milestone.deserialize(element));
        });
        deserialized.links.forEach(element => {
            links.push(Link.deserialize(element));
        });

        deserialized.milestones = milestones;
        deserialized.links = links;
        return deserialized;
    }

    getRoot() {
        return this.milestones[0];
    }

    addMilestone(x, y, name) {
        this.milestones.push(new Milestone(x, y, name));
        return this.milestones.length - 1;
    }
    
    findMilestoneIDByName(name) {
        return this.milestones.findIndex(m => m.getName() === name);
    }

    getMilestoneByName(name) {
        return this.milestones[this.findMilestoneIDByName(name)];
    }

    getMilestoneById(id) {
        return this.milestones[id];
    }

    addLink(id1, id2) {
        let m1id, m2id = undefined;
        if ((typeof id1)==='number') {
            const maxId = this.milestones.length;
            if(id1<0 || id1>=maxId || id2<0 || id2>=maxId || id1==id2) {
                return;
            }
            m1id = id1;
            m2id = id2;
        } else if (id1 instanceof(Milestone)) {
            m1id = this.milestones.findIndex(e=>e===id1);
            m2id = this.milestones.findIndex(e=>e===id2);
        } else {
            m1id = this.findMilestoneIDByName(id1);
            m2id = this.findMilestoneIDByName(id2);
            if(m1id<0 || m2id<0) {
                return;
            }
        }

        if((m1id != undefined) && (m2id != undefined)) {
            this.links.push(new Link(m1id, m2id));
            const linkId = this.links.length - 1;
            this.milestones[m1id].addLinkWhereIAmSource(linkId);
            this.milestones[m2id].addLinkWhereIAmDestination(linkId);
        }

        // console.log(">>>>", this.links);
        // console.log(">>>>", this.milestones);
        return this.links.length - 1;
    }
}

export default Model;