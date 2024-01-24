import State from "./State";

class LinkSecondElState extends State {
    constructor(context, milestone1) {
        super(context);
        console.log("Create new LinkSecondElState from " + milestone1.getName());
        this.milestone1 = milestone1;
        this.linkArrow = null;
        this.createArrowFollowingCursor();
        this.createOnKeyPressListener();
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("LinkSecondElState. Click on item " + clickedItem);
        this.context.stage.off('mousemove.arrowFollowingCursor touchmove.arrowFollowingCursor');
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
        console.error("TODO - change state");
    }



    static getName() {
        return "LinkSecondElState";
    }
}

export default LinkSecondElState; 