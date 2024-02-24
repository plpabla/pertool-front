import PointerState from "./PointerState";
import LinkFirstElState from "./LinkFirstElState";
import GetMilestoneNameState from './GetMilestoneNameState';
import State from "./State";


class MilestoneState extends State {
    constructor(context) {
        super(context);
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;

        if(clickedItem == undefined) {
            return new GetMilestoneNameState(this.context);
        }
        if(State.containsName(clickedItem,  "pointer"))
            return new PointerState(this.context);
        if(State.containsName(clickedItem,  "milestone"))
            return this;
        if(State.containsName(clickedItem,  "link"))
            return new LinkFirstElState(this.context);
        return this;
    }

    static getName() {
        return "MilestoneState";
    }
}

export default MilestoneState; 