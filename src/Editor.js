import Milestone from './Milestone';
import Link from './Link';
import Model from './Model';
import Toolbox from './Toolbox';
import PointerState from './states/PointerState';
import Backend from './Backend';
import axios from 'axios';

class Editor {
    
    constructor(stage, callbackForCriticalPathCalc=null) {
        this.stage = stage;
        this.onClickCallback = this.makeOnClicker();
        this.stage.on('click', this.onClickCallback);
        this.modelLayer = new Konva.Layer();

        this.stage.add(this.modelLayer);
        this.toolboxLayer = new Konva.Layer();
        this.stage.add(this.toolboxLayer);

        this.model = new Model(this.modelLayer);
        Model.registerCallbackForCriticalPathCalc(callbackForCriticalPathCalc)
        this.render();
        
        this.toolbox = new Toolbox(this.toolboxLayer);

        this.state = new PointerState(this);

        this.backend = new Backend();
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

    load(modelSerialized) {
        this.model = Model.deserialize(modelSerialized, this.modelLayer);
        this.model.canvasLayer = this.modelLayer;
        this.render();
    }

    update(modelSerialized) {
        const data = JSON.parse(modelSerialized)
        data.milestones.forEach(m=>{
            const currentM = this.model.getMilestoneById(m.id)
            currentM.onCriticalPath = m.onCriticalPath
            currentM.setTmin(m.timing.tmin)
            currentM.setTmax(m.timing.tmax)
            currentM.setTbuffer(m.timing.tbuf)
            currentM.setName(m.name)
        })

        data.links.forEach(l=>{
            const currentL = this.model.getLinkWithId(l.id)
            currentL.onCriticalPath = l.onCriticalPath
        })
    }
    
    async calculate() {
        let retVal;
        await axios({
            url: this.backend.calculateUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            transformResponse: r=>r,                 // do not convert to JSON automatically
            data: Model.serialize(this.model)
        })
        .then(res => {
            const model = res.data
            // this.clear(false)
            // this.load(model)
            this.update(model)
            retVal = {
                res: 'ok',
                msg: 'Critical path calculated' 
            }
        })
        .catch(err => {
            let msg = null
            try {
                const resData = JSON.parse(err.response.data)
                msg = resData.msg
            } catch (e) {
                msg = "No backend connectivity"
            }
            retVal = {
                res: 'fail',
                msg
            }
        })
        return retVal
    }
}

export default Editor;