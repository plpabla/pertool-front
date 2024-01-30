import State from "./State";
import InputBox from "../InputBox";
import PointerState from "./PointerState";
import MilestoneState from "./MilestoneState";

class GetMilestoneNameState extends State {
    constructor(context) {
        super(context);
        const posOnCanvas = context.stage.getPointerPosition();
        const posAbsolute = context.stage.getRelativePointerPosition();
        new InputBox(context.modelLayer, "Milestone name:", posOnCanvas, (name) => {
            if(name) {
                context.addMilestone(posAbsolute.x, posAbsolute.y, name);
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