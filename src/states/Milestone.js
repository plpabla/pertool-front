import PointerState from "./Pointer";
import LinkFirstElState from "./LinkFirstEl";
import GetMilestoneNameState from '../states/GetMilestoneName';
import State from "./State";


class MilestoneState extends State {
    constructor(context) {
        super(context);
        console.log("Create new MilestoneState");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("MilestoneState. Click on item " + clickedItem);

        if(clickedItem == undefined) {
            return new GetMilestoneNameState(this.context);
        }
        if(clickedItem === "pointer")
            return new PointerState(this.context);
        if(clickedItem === "milestone")
            return this;
        if(clickedItem === "link" || clickedItem === "fake-link")
            return new LinkFirstElState(this.context);
        return this;
    }

    static getName() {
        return "MilestoneState";
    }
}

export default MilestoneState; 