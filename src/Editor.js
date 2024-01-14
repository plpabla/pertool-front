import Model from './Model';
import Toolbox from './Toolbox';
import MilestoneState from './states/Milestone';
import PointerState from './states/Pointer';

class Editor {
    constructor(stage) {
        this.stage = stage;
        this.stage.on('click', this.onClick);
        console.error("Now it is called twice, fix it!");

        this.modelLayer = new Konva.Layer();
        this.stage.add(this.modelLayer);

        this.toolboxLayer = new Konva.Layer();
        this.stage.add(this.toolboxLayer);

        this.model = new Model();
        this.render();

        this.toolbox = new Toolbox(this.toolboxLayer, this.onClick);

        this.state = new PointerState();
    }

    onClick(e) {
        const target = e.target;
        const clickedItem = target.attrs.name;
        if(clickedItem == undefined) {
            console.log(target);
        }
        console.log(clickedItem + " clicked. TODO - add processing");
    }

    render() {
        this.model.milestones.forEach(m => this.drawMilestone(m));
    }

    drawMilestone(m) {
        this.toolboxLayer.add(m.img);
    }

    addMilestone(x, y, name) {
        const id = this.model.addMilestone(x,y,name);
        const m = this.model.getMilestoneById(id);
        this.modelLayer.add(m.img);
    }

    testUpdate() {
        this.addMilestone(100, 400, "a");
        this.addMilestone(400, 500, "y");
        this.addMilestone(300, 100, "xD");
    }
}

export default Editor;