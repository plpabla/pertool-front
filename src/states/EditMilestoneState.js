import State from "./State";
import InputBox from "../InputBox";
import PointerState from "./PointerState";
import MilestoneState from "./MilestoneState";

class EditMilestoneState extends State {
    constructor(context, milestone) {
        super(context);
        this._milestone = milestone;
        const posOnCanvas = context.stage.getPointerPosition();
        const posAbsolute = context.stage.getRelativePointerPosition();

        const formItems = [{
            label: "Milestone ID",
            key: "name",
            default: "TODDDDDOOOO"
        }, {
            label: "Description",
            key: "text",
            default: "TODDDDDOOOO",
            focus: true
        }];
        new InputBox(context.modelLayer, posOnCanvas, formItems , (data) => {
            const name = data["name"];
            const descr = data["text"] || "";
            if(name) {
                // TODO - EditMilestone
                // context.addMilestone(posAbsolute.x, posAbsolute.y, name, descr);
            }
            context.state = new PointerState(context);
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