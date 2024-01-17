import State from "./State";

class LinkSecondElState extends State {
    constructor() {
        super();
    }

    onClick(args) {
        return this;
    }

    static getName() {
        return "LinkSecondElState";
    }
}

export default LinkSecondElState; 