import Milestone from './Milestone';
import Link from './Link';
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
        this.model.milestones.forEach(m => this._draw(m));
        this.model.links.forEach(l => this._draw(l));
    }

    _draw(el) {
        this.modelLayer.add(el.getImg());
    }

    addMilestone(x, y, name, description="") {
        const id = this.model.addMilestone(x,y,name,description);
        const m = this.model.getMilestoneById(id);
        this.modelLayer.add(m.getImg());
    }

    clear(createRoot=true) {
        const pointer = {target: {attrs: {name: "pointer"}}};
        this.state = this.state.onClick(pointer);
        this.toolbox.select("pointer");

        const milestones = [...this.model.milestones];
        for(const m of milestones) {
            this.model.removeMilestone(m);
        }

        Milestone._id = 0;
        Link._id = 0;
        if(createRoot) {
            this.model.createRoot();
        }
        this.render();
    }

    load(model) {
        console.log(model);
        this.model = model;
        this.model.canvasLayer = this.modelLayer;
        this.render();
    }
}

export default Editor;