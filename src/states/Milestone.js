import PointerState from "./Pointer";
import State from "./State";

class MilestoneState extends State {
    constructor() {
        super();
        console.log("MilestoneState created");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log(clickedItem);
        if(clickedItem == undefined)
            return this;
        if(clickedItem === "pointer")
            return new PointerState();
        return this;
    }

    getName() {
        return "MilestoneState";
    }
}

export default MilestoneState; 