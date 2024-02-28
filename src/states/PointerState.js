import LinkFirstElState from "./LinkFirstElState";
import MilestoneState from "./MilestoneState";
import State from "./State";
import Milestone from "../Milestone";
import Link from "../Link";
import EditMilestoneState from "./EditMilestoneState";
import EditLinkState from "./EditLinkState";

class PointerState extends State {
    constructor(context) {
        super(context);
        this._focusedEl = null;
        this.onKeyPressBinded = this.onKeyPress.bind(this);
        this.createOnKeyPressListener(this.onKeyPressBinded);
    }

    onClick(args) {
        const target = args.target;
        let clickedItem = target.attrs.name;

        if(clickedItem == undefined 
            || State.containsName(clickedItem, "pointer") 
            || State.containsName(clickedItem, "milestone-description-field")) {
            this._switchFocus();
            return this;
        }

        if(State.containsName(clickedItem, "milestone")) {
            this._switchFocus();
            this.leaveState();
            return new MilestoneState(this.context);
        }

        if(State.containsName(clickedItem, "link")) {
            this._switchFocus();
            this.leaveState();
            return new LinkFirstElState(this.context);
        }

        if(State.containsName(clickedItem, "milestone-element") || State.containsName(clickedItem, "link-element")) {
            const clickedObj = target.parent.attrs.objInstance;
            return this._switchFocus(clickedObj);
        }
        console.error("How did we get here??", clickedItem);
        return this;
    }

    createOnKeyPressListener(callback) {
        document.addEventListener("keydown", callback);
    }

    leaveState() {
        document.removeEventListener("keydown", this.onKeyPressBinded);
    }

    onKeyPress(e) {
        if(e.key==="Escape") {
            this._switchFocus();
        }
        if(e.key==="Delete") {
            console.log('del');
        }
    }

    getFocusedEl() {
        return this._focusedEl; 
    }

    _switchFocus(clickedObj=null) {
        if(this._focusedEl === clickedObj) {
            // Click on already focused element
            if(this._focusedEl instanceof Milestone) {
                this.leaveState();
                return new EditMilestoneState(this.context, this._focusedEl);
            }
            if(this._focusedEl instanceof Link) {
                this.leaveState();
                return new EditLinkState(this.context, this._focusedEl);
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