import State from "./State";

class LinkFirstElState extends State {
    constructor() {
        super();
    }

    onClick(args) {
        return this;
    }

    static getName() {
        return "LinkFirstElState";
    }
}

export default LinkFirstElState; 