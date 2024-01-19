import LinkFirstElState from "./LinkFirstEl";
import MilestoneState from "./Milestone";
import State from "./State";

class PointerState extends State {
    constructor(context) {
        super(context);
        console.log("Create new PointerState");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("PointerState. Click on item " + clickedItem);

        if(clickedItem == undefined)
            return this;
        if(clickedItem === "pointer")
            return this;
        if(clickedItem === "milestone")
            return new MilestoneState(this.context);
        if(clickedItem === "link" || clickedItem === "fake-link")
            return new LinkFirstElState(this.context);
        return this;
    }

    static getName() {
        return "PointerState";
    }
}

export default PointerState; 