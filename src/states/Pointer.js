import MilestoneState from "./Milestone";
import State from "./State";

class PointerState extends State {
    constructor() {
        super();
        // console.log("PointerState created");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("onClick() for PointerState() has been called for item " + clickedItem);

        if(clickedItem == undefined)
            return this;
        if(clickedItem === "milestone")
            return new MilestoneState();
        return this;
    }

    static getName() {
        return "PointerState";
    }
}

export default PointerState; 