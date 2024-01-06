import GraphicalElement from "./GraphicalElement";
// import Konva from 'konva';
import Milestone from "./Milestone";

class Toolbox extends GraphicalElement {
    constructor(layer) {
        super();
        this.layer = layer;
        this.milestoneTemplate = new Milestone("");
        this.milestoneTemplate.setPos([0,0])
    }

    getImg() {
        console.log('TODO: drawing toolbox');
        this.milestoneTemplate.getImg();
    }
}

export default Toolbox;