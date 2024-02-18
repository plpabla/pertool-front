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

        if(clickedItem == undefined) {
            this._switchFocus();
            return this;
        }
        if(clickedItem === "pointer")
            return this;
        if(clickedItem === "milestone")
            return new MilestoneState(this.context);
        if(clickedItem === "link")
            return new LinkFirstElState(this.context);
        if(clickedItem === "milestone-element" || clickedItem === "link-element") {
            const clickedObj = target.parent.attrs.objInstance;
            this._switchFocus(clickedObj);
        }
        return this;
    }

    getFocusedEl() {
        return this._focusedEl; 
    }

    _switchFocus(clickedObj=null) {
        if(this._focusedEl === clickedObj) {
            // Click on already focused element
            return;
        }
        if(this._focusedEl) {
            this._focusedEl.focus(false);
        }
        if(clickedObj) {
            this._focusedEl = clickedObj;
            this._focusedEl.focus(true);
        } else {
            this._focusedEl = null;
        }
    }


    static getName() {
        return "PointerState";
    }
}

export default PointerState; 