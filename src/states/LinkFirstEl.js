import State from "./State";

class LinkFirstElState extends State {
    constructor(context) {
        super(context);
        console.log("Create new LinkFirstElState");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("LinkFirstElState. Click on item " + clickedItem);
        return this;
    }

    static getName() {
        return "LinkFirstElState";
    }
}

export default LinkFirstElState; 