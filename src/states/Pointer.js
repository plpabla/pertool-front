import MilestoneState from "./Milestone";
import State from "./State";

class PointerState extends State {
    constructor() {
        super();
        console.log("PointerState created");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log(clickedItem);
        if(clickedItem == undefined)
            return this;
        if(clickedItem === "milestone")
            return new MilestoneState();
        return this;
    }

    getName() {
        return "PointerState";
    }
}

export default PointerState; 