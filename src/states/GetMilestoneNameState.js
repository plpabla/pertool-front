import State from "./State";
import InputBox from "../InputBox";
import PointerState from "./PointerState";
import MilestoneState from "./MilestoneState";
import Milestone from "../Milestone";

class GetMilestoneNameState extends State {
    constructor(context) {
        super(context);
        const posOnCanvas = context.stage.getPointerPosition();
        const posAbsolute = context.stage.getRelativePointerPosition();
        const defaultValue = context.model.milestones.length;
        const formItems = Milestone.getFormItems();
        formItems.find(e=>e.key==="name")["default"] = defaultValue;

        new InputBox(context.modelLayer, posOnCanvas, formItems , (data) => {
            const name = data["name"];
            const descr = data["text"] || "";
            if(name) {
                context.addMilestone(posAbsolute.x, posAbsolute.y, name, descr);
                context.state = new MilestoneState(context);
            } else {
                context.state = new PointerState(context);
                context.toolbox.select("pointer");
            }
        });
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        return this;
    }

    static getName() {
        return "GetMilestoneNameState";
    }
}

export default GetMilestoneNameState; 