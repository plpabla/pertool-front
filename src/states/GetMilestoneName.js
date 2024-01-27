import State from "./State";
import InputBox from "../InputBox";
import PointerState from "./Pointer";
import MilestoneState from "./Milestone";

class GetMilestoneNameState extends State {
    constructor(context) {
        super(context);
        console.log("Create new GetMilestoneNameState");
        const posOnCanvas = context.stage.getPointerPosition();
        const posAbsolute = context.stage.getRelativePointerPosition();
        new InputBox(context.modelLayer, "Milestone name:", posOnCanvas, (name) => {
            if(y) {
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
        console.log("GetMilestoneNameState. Click on item " + clickedItem);
        console.log(this.context);
        return this;
    }

    static getName() {
        return "GetMilestoneNameState";
    }
}

export default GetMilestoneNameState; 