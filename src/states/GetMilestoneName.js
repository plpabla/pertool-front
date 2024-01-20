import State from "./State";
import InputBox from "../InputBox";
import PointerState from "./Pointer";
import MilestoneState from "./Milestone";

class GetMilestoneNameState extends State {
    constructor(context) {
        super(context);
        console.log("Create new GetMilestoneNameState");
        const pos = context.stage.getPointerPosition();
        new InputBox(context.modelLayer, "Milestone name:", pos, (y) => {
            if(y) {
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