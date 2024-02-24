import State from "./State";
import InputBox from "../InputBox";
import LinkFirstElState from "./LinkFirstElState";
import Link from "../Link";

class GetTaskLengthState extends State {
    constructor(context, m1, m2, arrow) {
        super(context);
        this.m1 = m1;
        this.m2 = m2;
        this.arrow = arrow;
        const posOnCanvas = context.stage.getPointerPosition();
        const formItems = Link.formItems;

        new InputBox(context.modelLayer, posOnCanvas, formItems, (data) => {
            const taskLen = parseFloat(data["taskLen"]);
            if(!isNaN(taskLen)) {
                context.model.addLink(m1, m2, taskLen);
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