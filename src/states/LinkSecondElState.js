import PointerState from "./PointerState";
import MilestoneState from "./MilestoneState";
import LinkFirstElState from "./LinkFirstElState";
import State from "./State";

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

        this.context.stage.off('mousemove.arrowFollowingCursor touchmove.arrowFollowingCursor');
        this.cancel();

        if(clickedItem === "pointer") {
            return new PointerState(this.context);
        }
        if(clickedItem === "milestone") {
            this.context.toolbox.select("milestone");
            return new MilestoneState(this.context);
        }
        if(clickedItem === "link") {
            this.context.toolbox.select("link");
            return new LinkFirstElState(this.context);
        }
        if(clickedItem === "milestone-element") {
            // TODO: Check if not the same - if not, create a link
        }
        return this;
    }

    createArrowFollowingCursor() {
        const cursorPos = this.context.stage.getRelativePointerPosition();
        this.linkArrow = new Konva.Arrow({
            points: [this.milestone1.img.attrs.x, this.milestone1.img.attrs.y, 
                cursorPos.x, cursorPos.y],
            stroke: "black"
        });

        this.context.stage.on('mousemove.arrowFollowingCursor touchmove.arrowFollowingCursor', (e) => {
            const cursorPos = this.context.stage.getRelativePointerPosition();
            const pos = [
                this.milestone1.img.attrs.x, 
                this.milestone1.img.attrs.y, 
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
        this.context.stage.off('mousemove.arrowFollowingCursor touchmove.arrowFollowingCursor');
        this.linkArrow.destroy();
        this.context.state = new PointerState(this.context);
        this.context.toolbox.select("pointer");
    }

    static getName() {
        return "LinkSecondElState";
    }
}

export default LinkSecondElState; 