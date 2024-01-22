import State from "./State";

class LinkSecondElState extends State {
    constructor(context, milestone1) {
        super(context);
        console.log("Create new LinkSecondElState from " + milestone1.getName());
        this.milestone1 = milestone1;
        this.createArrowFollowingCursor();
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("LinkSecondElState. Click on item " + clickedItem);
        return this;
    }

    createArrowFollowingCursor() {
        const cursorPos = this.context.stage.getPointerPosition();
        const a = new Konva.Arrow({
            points: [this.milestone1.img.attrs.x, this.milestone1.img.attrs.y, 
                cursorPos.x, cursorPos.y],
            stroke: "black"
        });
        this.context.stage.on('mousemove touchmove', (e) => {
            console.log(e.evt);
            a.attrs.points[0] = this.milestone1.img.attrs.x;
            a.attrs.points[1] = this.milestone1.img.attrs.y;
            a.attrs.points[2] = e.evt.x;
            a.attrs.points[3] = e.evt.y;
            a.draw();
            console.log(`Move to (${this.milestone1.img.attrs.x}, ${this.milestone1.img.attrs.y}) -> (${e.evt.x}, ${e.evt.y})`);
        })
        this.context.modelLayer.add(a);
    }

    static getName() {
        return "LinkSecondElState";
    }
}

export default LinkSecondElState; 