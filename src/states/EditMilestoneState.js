import State from "./State";
import InputBox from "../InputBox";
import PointerState from "./PointerState";
import Milestone from "../Milestone";

class EditMilestoneState extends State {
    constructor(context, milestone) {
        super(context);
        this.context = context;
        this._milestone = milestone;
        const posOnCanvas = context.stage.getPointerPosition();
        const posAbsolute = context.stage.getRelativePointerPosition();

        const formItems = Milestone.formItems;
        formItems.find(e=>e.key==="name")["default"] = this._milestone.getName();
        formItems.find(e=>e.key==="text")["default"] = this._milestone.getDescription();

        new InputBox(this.context.modelLayer, posOnCanvas, formItems , (data) => {
            const name = data["name"];
            const descr = data["text"] || "";
            if(name) {
                this._milestone.setName(name);
                this._milestone.setDescription(descr);
            }
            this.context.state = new PointerState(this.context);
            this._milestone.focus(false);
        });
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        return this;
    }

    static getName() {
        return "EditMilestoneState";
    }
}

export default EditMilestoneState; 