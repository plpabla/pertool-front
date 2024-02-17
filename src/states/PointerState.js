import LinkFirstElState from "./LinkFirstElState";
import MilestoneState from "./MilestoneState";
import State from "./State";

class PointerState extends State {
    constructor(context) {
        super(context);
        this._focusedEl = null;
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;

        if(clickedItem == undefined)
            return this;
        if(clickedItem === "pointer")
            return this;
        if(clickedItem === "milestone")
            return new MilestoneState(this.context);
        if(clickedItem === "link")
            return new LinkFirstElState(this.context);
        if(clickedItem === "milestone-element" || clickedItem === "link-element") {
            const clickedObj = target.parent.attrs.objInstance;
            this._removeFocus();
            this._focusedEl = clickedObj;
            this._focusedEl.focus(true);
        }
        return this;
    }

    getFocusedEl() {
        return this._focusedEl; 
    }

    _removeFocus() {
        if(this._focusedEl) {
            this._focusedEl.focus(false);
        }
    }

    static getName() {
        return "PointerState";
    }
}

export default PointerState; 