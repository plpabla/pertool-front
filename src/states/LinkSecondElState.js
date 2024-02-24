import PointerState from "./PointerState";
import MilestoneState from "./MilestoneState";
import LinkFirstElState from "./LinkFirstElState";
import State from "./State";
import GetTaskLengthState from "./GetTaskLengthState";

class LinkSecondElState extends State {
    constructor(context, milestone1) {
        super(context);
        this.milestone1 = milestone1;
        this.linkArrow = null;
        this.createArrowFollowingCursor();
        this.createOnKeyPressListener();
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;

        if(clickedItem === undefined) {
            return this;
        }

        if(State.containsName(clickedItem,  "pointer")) {
            this.cancel();
            return new PointerState(this.context);
        }
        if(State.containsName(clickedItem,  "milestone")) {
            this.cancel();
            this.context.toolbox.select("milestone");
            return new MilestoneState(this.context);
        }
        if(State.containsName(clickedItem,  "link")) {
            this.cancel();
            this.context.toolbox.select("link");
            return new LinkFirstElState(this.context);
        }
        if(State.containsName(clickedItem,  "milestone-element")) {
            const milestone2 = target.parent.attrs.objInstance;
            if ((this.milestone1 !== milestone2) && (milestone2 != this.context.model.getRoot())) {
                this.pause();
                return new GetTaskLengthState(this.context, this.milestone1, milestone2, this.linkArrow);
            } else {
                return this;
            }
        }
        return this;
    }

    createArrowFollowingCursor() {
        const cursorPos = this.context.stage.getRelativePointerPosition();
        this.linkArrow = new Konva.Arrow({
            points: [this.milestone1.getImg().attrs.x, this.milestone1.getImg().attrs.y, 
                cursorPos.x, cursorPos.y],
            stroke: "black"
        });

        this.context.stage.on('mousemove.arrowFollowingCursor touchmove.arrowFollowingCursor', (e) => {
            const cursorPos = this.context.stage.getRelativePointerPosition();
            const pos = [
                this.milestone1.getImg().attrs.x, 
                this.milestone1.getImg().attrs.y, 
                cursorPos.x, 
                cursorPos.y];
            this.linkArrow.points(pos);
        })
        this.context.modelLayer.add(this.linkArrow);
        // move back so I can still hit milestones
        this.linkArrow.zIndex(0);
    }

    createOnKeyPressListener() {
        document.addEventListener("keydown", processKeyDownEvent);

        const self = processKeyDownEvent;
        const this_ = this;
        function processKeyDownEvent(e) {
            if(e.key==="Escape") {
                document.removeEventListener("keydown", self);
                this_.cancel();
            }
        }
    }

    cancel() {
        this.pause();
        this.linkArrow.destroy();
        this.context.state = new PointerState(this.context);
        this.context.toolbox.select("pointer");
    }

    pause() {
        this.context.stage.off('mousemove.arrowFollowingCursor touchmove.arrowFollowingCursor');
    }

    static getName() {
        return "LinkSecondElState";
    }
}

export default LinkSecondElState; 