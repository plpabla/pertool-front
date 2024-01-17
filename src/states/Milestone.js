import PointerState from "./Pointer";
import State from "./State";

class MilestoneState extends State {
    constructor() {
        super();
    }

    onClick(args) {
        return this;
    }

    static getName() {
        return "MilestoneState";
    }
}

export default MilestoneState; 