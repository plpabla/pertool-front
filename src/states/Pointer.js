import MilestoneState from "./Milestone";
import State from "./State";

class PointerState extends State {
    constructor() {
        super();
        // console.log("PointerState created");
    }

    onClick(args) {
        return this;
        return new MilestoneState();
    }

    getName() {
        return "PointerState";
    }
}

export default PointerState; 