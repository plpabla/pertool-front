import State from "./State";
import InputBox from "../InputBox";
import PointerState from "./PointerState";
import Link from "../Link";

class EditLinkState extends State {
    constructor(context, link) {
        super(context);
        this.context = context;
        this._link = link;
        const posOnCanvas = context.stage.getPointerPosition();
        const posAbsolute = context.stage.getRelativePointerPosition();

        const formItems = Link.formItems;
        formItems.find(e=>e.key==="taskLen")["default"] = this._link.getTaskLength();

        this.inputBox = new InputBox(this.context.modelLayer, posOnCanvas, formItems , (data) => {
            const taskLen = data["taskLen"];
            this._link.setTaskLength(String(taskLen));

            this.context.state = new PointerState(this.context);
            this._link.focus(false);
        });
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        return this;
    }

    static getName() {
        return "EditLinkState";
    }
}

export default EditLinkState; 