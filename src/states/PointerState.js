import LinkFirstElState from "./LinkFirstElState";
import MilestoneState from "./MilestoneState";
import State from "./State";
import Milestone from "../Milestone";
import Link from "../Link";

class PointerState extends State {
    constructor(context) {
        super(context);
        this._focusedEl = null;
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;

        if(clickedItem == undefined || clickedItem === "pointer") {
            this._switchFocus();
            return this;
        }

        if(clickedItem === "milestone") {
            this._switchFocus();
            return new MilestoneState(this.context);
        }

        if(clickedItem === "link") {
            this._switchFocus();
            return new LinkFirstElState(this.context);
        }

        if(clickedItem === "milestone-element" || clickedItem === "link-element") {
            const clickedObj = target.parent.attrs.objInstance;
            return this._switchFocus(clickedObj);
        }
        console.error("How did we get here??");
    }

    getFocusedEl() {
        return this._focusedEl; 
    }

    _switchFocus(clickedObj=null) {
        if(this._focusedEl === clickedObj) {
            // Click on already focused element
            // TODO: add logic (as new state to edit this element)
            if(this._focusedEl instanceof Milestone) {
                console.log("double click on Milestone " + this._focusedEl.getName());
            }
            if(this._focusedEl instanceof Link) {
                console.log("double click on Link with length " + this._focusedEl.getTaskLength());
            }
            return this;
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
        return this;
    }


    static getName() {
        return "PointerState";
    }
}

export default PointerState; 