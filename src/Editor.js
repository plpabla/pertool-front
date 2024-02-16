import Model from './Model';
import Toolbox from './Toolbox';
import PointerState from './states/PointerState';

class Editor {
    
    constructor(stage) {
        this.stage = stage;
        this.onClickCallback = this.makeOnClicker();
        this.stage.on('click', this.onClickCallback);
        this.modelLayer = new Konva.Layer();

        this.stage.add(this.modelLayer);
        this.toolboxLayer = new Konva.Layer();
        this.stage.add(this.toolboxLayer);

        this.model = new Model(this.modelLayer);
        this.render();
        
        this.toolbox = new Toolbox(this.toolboxLayer);

        this.state = new PointerState(this);
    }

    makeOnClicker() {
        const editor = this;
        return function(e) {
            editor.state = editor.state.onClick(e);
        }
    }

    render() {
        // Note: Right now it is used only to draw intitial milestone
        // later we will use it to render full diagram after loading it
        this.model.milestones.forEach(m => this.drawMilestone(m));
    }

    drawMilestone(m) {
        this.modelLayer.add(m.img);
    }

    addMilestone(x, y, name, description="") {
        const id = this.model.addMilestone(x,y,name,description);
        const m = this.model.getMilestoneById(id);
        this.modelLayer.add(m.img);
    }
}

export default Editor;