import PointerState from "./PointerState";
import MilestoneState from "./MilestoneState";
import LinkSecondElState from "./LinkSecondElState";
import State from "./State";

class LinkFirstElState extends State {
    constructor(context) {
        super(context);
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;

        if(clickedItem == undefined) {
            return this;
        }
        if(clickedItem === "pointer") {
            return new PointerState(this.context);
        }
        if(clickedItem === "milestone") {
            return new MilestoneState(this.context);
        }
        if(clickedItem === "link") {
            return this;
        }
        if(clickedItem === "milestone-element") {
            return new LinkSecondElState(this.context, target.parent.attrs.objInstance);
        }
        return this;
    }

    static getName() {
        return "LinkFirstElState";
    }
}

export default LinkFirstElState; 