import LinkFirstElState from "./LinkFirstElState";
import MilestoneState from "./MilestoneState";
import State from "./State";
import Milestone from "../Milestone";
import Link from "../Link";
import EditMilestoneState from "./EditMilestoneState";

class PointerState extends State {
    constructor(context) {
        super(context);
        this._focusedEl = null;
    }

    onClick(args) {
        const target = args.target;
        let clickedItem = target.attrs.name;

        if(clickedItem == undefined || State.containsName(clickedItem, "pointer")) {
            this._switchFocus();
            return this;
        }

        if(State.containsName(clickedItem, "milestone")) {
            this._switchFocus();
            return new MilestoneState(this.context);
        }

        if(State.containsName(clickedItem, "link")) {
            this._switchFocus();
            return new LinkFirstElState(this.context);
        }

        if(State.containsName(clickedItem, "milestone-element") || State.containsName(clickedItem, "link-element")) {
            const clickedObj = target.parent.attrs.objInstance;
            return this._switchFocus(clickedObj);
        }
        console.error("How did we get here??");
        return this;
    }

    getFocusedEl() {
        return this._focusedEl; 
    }

    _switchFocus(clickedObj=null) {
        if(this._focusedEl === clickedObj) {
            // Click on already focused element
            // TODO: add logic (as new state to edit this element)
            if(this._focusedEl instanceof Milestone) {
                return new EditMilestoneState(this.context, this._focusedEl);
            }
            if(this._focusedEl instanceof Link) {
                console.log("double click on Link with length " + this._focusedEl.getTaskLength() + " TODO!!!!!!");
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