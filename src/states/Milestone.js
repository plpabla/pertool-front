import PointerState from "./Pointer";
import LinkFirstElState from "./LinkFirstEl";
import GetMilestoneNameState from '../states/GetMilestoneName';
import State from "./State";


class MilestoneState extends State {
    constructor() {
        super();
        console.log("Create new MilestoneState");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("MilestoneState. Click on item " + clickedItem);

        if(clickedItem == undefined) {
            // TODO: Create a new milestone (somehow)
            return new GetMilestoneNameState();
        }
        if(clickedItem === "pointer")
            return new PointerState();
        if(clickedItem === "milestone")
            return this;
        if(clickedItem === "link" || clickedItem === "fake-link")
            return new LinkFirstElState();
        return this;
    }

    static getName() {
        return "MilestoneState";
    }
}

export default MilestoneState; 