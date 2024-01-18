import State from "./State";

class LinkSecondElState extends State {
    constructor() {
        super();
        console.log("Create new LinkSecondElState");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("LinkSecondElState. Click on item " + clickedItem);
        return this;
    }

    static getName() {
        return "LinkSecondElState";
    }
}

export default LinkSecondElState; 