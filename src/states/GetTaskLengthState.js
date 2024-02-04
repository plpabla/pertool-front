import State from "./State";
import InputBox from "../InputBox";

class GetTaskLengthState extends State {
    constructor(context, m1, m2, arrow) {
        super(context);
        this.m1 = m1;
        this.m2 = m2;
        this.arrow = arrow;
        const posOnCanvas = context.stage.getPointerPosition();
        const posAbsolute = context.stage.getRelativePointerPosition();
        const defaultValue = context.model.milestones.length;
        new InputBox(context.modelLayer, "Task length:", posOnCanvas, (str) => {
            const value = Number.parseFloat(str);
            if(value) {
                // context.addMilestone(posAbsolute.x, posAbsolute.y, name);
                // context.state = new MilestoneState(context);
            } else {
                // context.state = new PointerState(context);
                // context.toolbox.select("pointer");
            }
            arrow.destroy();
        },
        defaultValue);
    }

    onClick(args) {
        // const target = args.target;
        // const clickedItem = target.attrs.name;
        return this;
    }

    static getName() {
        return "GetTaskLengthState";
    }
}

export default GetTaskLengthState; 