import Milestone from './Milestone.js';
import Link from './Link.js';

class Model {
    constructor(canvasLayer) {
        const root = new Milestone(200, 300, "0", "", this);
        this.milestones = [root];
        this.rootId = root.getId();
        this.links = [];
        this.canvasLayer = canvasLayer;
    }

    static serialize(obj) {
        const milestones = obj.milestones;
        const links = obj.links;
        const canvasLayer = obj.canvasLayer;
        delete obj.canvasLayer;

        const state = {"Link._id": Link._id, "Milestone._id": Milestone._id};
        obj.state = state;
        
        obj.milestones = [];
        obj.links = [];
        milestones.forEach(m=>{
            obj.milestones.push(Milestone.serialize(m));
        });
        links.forEach(l=>{
            obj.links.push(Link.serialize(l));
        });

        const str = JSON.stringify(obj);

        // restore original elements
        obj.milestones = milestones;
        obj.links = links;
        obj.canvasLayer = canvasLayer;
        return str;
    }

    static deserialize(str, canvasLayer) {
        const deserialized_data = JSON.parse(str);
        const deserialized = Object.create(Model.prototype, Object.getOwnPropertyDescriptors(deserialized_data));

        const milestones = [];
        const links = [];
        deserialized.milestones.forEach(element => {
            milestones.push(Milestone.deserialize(element, this));
        });
        deserialized.links.forEach(element => {
            links.push(Link.deserialize(element));
        });

        deserialized.milestones = milestones;
        deserialized.links = links;
        deserialized.canvasLayer = canvasLayer;

        Link._id = deserialized.state["Link._id"];
        Milestone._id = deserialized.state["Milestone._id"];
        return deserialized;
    }

    onDrag(milestone) {
        milestone.sourceLinks.forEach(e=>this._updateArrow(e));
        milestone.destinationLinks.forEach(e=>this._updateArrow(e));
    }

    _updateArrow(linkId) {
        const link = this.getLinkWithId(linkId);
        const m1 = this.getMilestoneById(link.sourceId);
        const m2 = this.getMilestoneById(link.destId);
        const pos = Model.calculateArrowPosition(m1, m2);
        link.setPosition(...pos);
    }


    getRoot() {
        return this.milestones.find(m=>m.getId()===this.rootId);
    }

    addMilestone(x, y, name, description="") {
        const m = new Milestone(x, y, name, description, this);
        this.milestones.push(m);
        return m.getId();
    }
    
    findMilestoneIDByName(name) {
        const m = this.milestones.find(m => m.getName() === name);
        if(m) {
            return m.getId();
        } else {
            return null;
        }
    }

    getMilestoneByName(name) {
        return this.milestones.find(m=>m.getName()===name) || null;
    }

    getMilestoneById(id) {
        return this.milestones.find(m=>m.getId()===id) || null;
    }

    checkIfMilestoneWithGivenIdExists(id) {
        // TODO - refactor here!!!
        let res = null;
        this.milestones.forEach(m=>{
            if(m.getId()===id) {
                res = id;
                return;
            }
        });
        return res;
    }

    getLinkWithId(id) {
        return this.links.find(l => l.getId() === id) || null;
    }

    addLink(id1, id2, taskLength) {
        let m1id, m2id = null;
        if ((typeof id1)==='number') {
            m1id = this.checkIfMilestoneWithGivenIdExists(id1);
            m2id = this.checkIfMilestoneWithGivenIdExists(id2);
        } else if (id1 instanceof(Milestone)) {
            m1id = id1.getId();
            m2id = id2.getId();
        } else {
            m1id = this.findMilestoneIDByName(id1);
            m2id = this.findMilestoneIDByName(id2);
            if(m1id===null || m2id===null) {
                return;
            }
        }

        let linkId = null;
        if((m1id != null) && (m2id != null) && (m1id !== m2id)) {
            const points = Model.calculateArrowPosition(this.getMilestoneById(m1id),this.getMilestoneById(m2id));
            const link = new Link(m1id, m2id, taskLength, points);
            this.links.push(link);
            this.canvasLayer.add(link.getImg());
            linkId = link.getId();
            this.getMilestoneById(m1id).addLinkWhereIAmSource(linkId);
            this.getMilestoneById(m2id).addLinkWhereIAmDestination(linkId);
        }

        return linkId;
    }

    removeLink(link) {
        let linkObj = null;
        if((typeof link) === "number") {
            linkObj = this.getLinkWithId(link);
        } else if (link instanceof Link) {
            linkObj = link;
        } else {
            console.error("Unsupported argument passed to Model.removeLink()");
            return;
        }
        
        if(linkObj !== null) {
            const srcMilestone = linkObj.getSourceMilestoneId();
            const dstMilestone = linkObj.getDestinationMilestoneId();
            this.getMilestoneById(srcMilestone).removeLink(linkObj.getId());
            this.getMilestoneById(dstMilestone).removeLink(linkObj.getId());
            linkObj.destroy();
            const idx = this.links.indexOf(linkObj);
            this.links.splice(idx, 1);
        }
    }

    removeMilestone(m) {
        const idx = this.milestones.indexOf(m);
        if(idx>=0) {
            const m = this.milestones[idx];
            const links = [...m.sourceLinks, ...m.destinationLinks];
            for(let id of links) {
                this.removeLink(id);
            }
            this.milestones.splice(idx,1);
        }
        m.destroy();
    }

    static calculateArrowPosition(m1, m2, r=Milestone.radius) {
        return calcPos(...m1.getPos(), r, ...m2.getPos(), r);

        function calcPos(x1, y1, r1, x2, y2, r2) {
            const l = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
            const cosA = (x2-x1) / l;
            const sinA = (y2-y1) / l;
            return [x1 + r1*cosA,
                    y1 + r1*sinA,
                    x2 - r2*cosA,
                    y2 - r2*sinA];
        }
    } 
}

export default Model;