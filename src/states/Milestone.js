import State from "./State";

class MilestoneState extends State {
    constructor() {
        super();
        // console.log("MilestoneState created");
    }

    onClick(args) {
        return this;
    }

    getName() {
        return "MilestoneState";
    }
}

export default MilestoneState; 