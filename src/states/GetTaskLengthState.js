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
        const formItems = [{
            label: "Task lenght",
            key: "taskLen",
            default: "0"
        }];

        new InputBox(context.modelLayer, posOnCanvas, formItems, (str) => {
            const value = Number.parseFloat(str);
            if(!isNaN(value)) {
                context.model.addLink(m1, m2, value);
            } else {
            }
            context.state = new LinkFirstElState(context);
            context.toolbox.select("link");
            arrow.destroy();
        });
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