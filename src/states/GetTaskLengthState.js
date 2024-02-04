import State from "./State";
import InputBox from "../InputBox";
import LinkFirstElState from "./LinkFirstElState";

class GetTaskLengthState extends State {
    constructor(context, m1, m2, arrow) {
        super(context);
        this.m1 = m1;
        this.m2 = m2;
        this.arrow = arrow;
        const posOnCanvas = context.stage.getPointerPosition();
        const defaultValue = "0";
        new InputBox(context.modelLayer, "Task length:", posOnCanvas, (str) => {
            const value = Number.parseFloat(str);
            console.log(`>>> Entered value: ${str}. Numeric: ${value}`);
            if(value) {
                // context.addLink(m1, m2, value);
            } else {
            }
            context.state = new LinkFirstElState(context);
            context.toolbox.select("link");
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