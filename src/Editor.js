import Model from './Model';
import Toolbox from './Toolbox';

class Editor {
    constructor(stage) {
        this.stage = stage;

        this.modelLayer = new Konva.Layer();
        this.stage.add(this.modelLayer);

        this.toolboxLayer = new Konva.Layer();
        this.stage.add(this.toolboxLayer);

        this.model = new Model();
        this.render();

        this.toolbox = new Toolbox(this.toolboxLayer);
    }

    render() {
        this.model.milestones.forEach(m => this.drawMilestone(m));
    }

    drawMilestone(m) {
        this.toolboxLayer.add(m.img);
    }

    testUpdate() {
        this.addMilestone(100, 400, "a");
        this.addMilestone(400, 500, "y");
        this.addMilestone(300, 100, "xD");
    }

    addMilestone(x, y, name) {
        const id = this.model.addMilestone(x,y,name);
        const m = this.model.getMilestoneById(id);
        this.modelLayer.add(m.img);
    }
}

export default Editor;