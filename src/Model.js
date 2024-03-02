import Milestone from './Milestone.js';
import Link from './Link.js';

class Model {
    constructor(canvasLayer) {
        this.milestones = [new Milestone(200, 300, "0", "", this)];
        this.links = [];
        this.canvasLayer = canvasLayer;
    }

    static serialize(obj) {
        const milestones = obj.milestones;
        const links = obj.links;
        const state = {"Link._id": Link._id};
        obj.state = state;
        
        obj.milestones = [];
        obj.links = [];
        milestones.forEach(m=>{
            if(m !== null) {
                obj.milestones.push(Milestone.serialize(m))
            } else {
                obj.milestones.push(null);
            }
        });
        links.forEach(l=>{
            if(l !== null) {
                obj.links.push(Link.serialize(l))
            } else {
                obj.links.push(null);
            }
        });

        const str = JSON.stringify(obj);

        // restore original elements
        obj.milestones = milestones;
        obj.links = links;
        return str;
    }

    static deserialize(str, canvasLayer) {
        // console.log('String to deserialize: ' + str)
        const deserialized_data = JSON.parse(str);
        const deserialized = Object.create(Model.prototype, Object.getOwnPropertyDescriptors(deserialized_data));

        const milestones = [];
        const links = [];
        deserialized.milestones.forEach(element => {
            if(element !== null) {
                milestones.push(Milestone.deserialize(element, this));
            } else {
                milestones.push(null);
            }
        });
        deserialized.links.forEach(element => {
            if(element != null) {
                links.push(Link.deserialize(element));
            } else {
                links.push(null);
            }
        });

        deserialized.milestones = milestones;
        deserialized.links = links;
        deserialized.canvasLayer = canvasLayer;

        Link._id = deserialized.state["Link._id"];
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
        return this.milestones[0];
    }

    addMilestone(x, y, name, description="") {
        this.milestones.push(new Milestone(x, y, name, description, this));
        return this.milestones.length - 1;
    }
    
    findMilestoneIDByName(name) {
        return this.milestones.findIndex(m => m.getName() === name);
    }

    findMilestoneIDByPassedId(id) {
        return this.milestones.findIndex(m => m.getId() === id);
    }

    getMilestoneByName(name) {
        return this.milestones[this.findMilestoneIDByName(name)];
    }

    getMilestoneById(id) {
        return this.milestones[id];
    }

    getLinkWithId(id) {
        return this.links.find(l => l.getId() === id) || null;
    }

    addLink(id1, id2, taskLength) {
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

        let linkId = null;
        if((m1id != undefined) && (m2id != undefined)) {
            const points = Model.calculateArrowPosition(this.getMilestoneById(m1id),this.getMilestoneById(m2id));
            const link = new Link(m1id, m2id, taskLength, points);
            this.links.push(link);
            this.canvasLayer.add(link.getImg());
            linkId = link.getId();
            this.milestones[m1id].addLinkWhereIAmSource(linkId);
            this.milestones[m2id].addLinkWhereIAmDestination(linkId);
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
            this.milestones[srcMilestone].removeLink(linkObj.getId());
            this.milestones[dstMilestone].removeLink(linkObj.getId());
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
            this.milestones[idx] = null;
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