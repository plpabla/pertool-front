import LinkFirstElState from "./LinkFirstElState";
import MilestoneState from "./MilestoneState";
import State from "./State";

class PointerState extends State {
    constructor(context) {
        super(context);
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log(">>>>>", clickedItem);

        if(clickedItem == undefined)
            return this;
        if(clickedItem === "pointer")
            return this;
        if(clickedItem === "milestone")
            return new MilestoneState(this.context);
        if(clickedItem === "link")
            return new LinkFirstElState(this.context);
        return this;
    }

    static getName() {
        return "PointerState";
    }
}

export default PointerState; 