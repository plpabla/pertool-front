import GraphicalElement from "./GraphicalElement";
// import Konva from 'konva';
import Milestone from "./Milestone";

class Toolbox extends GraphicalElement {
    constructor(layer) {
        super();
        this.layer = layer;
        this.milestoneTemplate = new Milestone("");
    }

    draw() {
        console.log('TODO: drawing toolbox');
        this.milestoneTemplate.draw();
    }
}

export default Toolbox;