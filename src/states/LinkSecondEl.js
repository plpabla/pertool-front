import State from "./State";

class LinkSecondElState extends State {
    constructor(context, milestone1) {
        super(context);
        console.log("Create new LinkSecondElState from " + milestone1.getName());
        this.milestone1 = milestone1;
        this.linkArrow = null;
        this.createArrowFollowingCursor();
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("LinkSecondElState. Click on item " + clickedItem);
        this.context.stage.off('mousemove.arrowFollowingCursor touchmove.arrowFollowingCursor');
        return this;
    }

    createArrowFollowingCursor() {
        const cursorPos = this.context.stage.getPointerPosition();
        this.linkArrow = new Konva.Arrow({
            points: [this.milestone1.img.attrs.x, this.milestone1.img.attrs.y, 
                cursorPos.x, cursorPos.y],
            stroke: "black"
        });
        const stageBox = this.context.stage.container().getBoundingClientRect();
        const offset = {
            x: stageBox.left,
            y: stageBox.top 
        };

        this.context.stage.on('mousemove.arrowFollowingCursor touchmove.arrowFollowingCursor', (e) => {
            const pos = [this.milestone1.img.attrs.x, this.milestone1.img.attrs.y, e.evt.x-offset.x, e.evt.y-offset.y];
            this.linkArrow.points(pos);
        })
        this.context.modelLayer.add(this.linkArrow);
    }

    static getName() {
        return "LinkSecondElState";
    }
}

export default LinkSecondElState; 