import Model from './Model';
import Toolbox from './Toolbox';
import MilestoneState from './states/Milestone';
import PointerState from './states/Pointer';

class Editor {
    
    constructor(stage) {
        this.stage = stage;
        this.onClickCallback = this.makeOnClicker();
        this.stage.on('click', this.onClickCallback);
        this.modelLayer = new Konva.Layer();

        this.stage.add(this.modelLayer);
        this.toolboxLayer = new Konva.Layer();
        this.stage.add(this.toolboxLayer);

        // how to do it correctly?
        // document.addEventListener('keydown', function (e) {console.log(e.keyCode)});

        this.model = new Model();
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
}

export default Editor;