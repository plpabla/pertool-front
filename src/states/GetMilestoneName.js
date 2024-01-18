import State from "./State";

class GetMilestoneNameState extends State {
    constructor() {
        super();
        console.log("Create new GetMilestoneNameState");
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("GetMilestoneNameState. Click on item " + clickedItem);
        return this;
    }

    static getName() {
        return "GetMilestoneNameState";
    }
}

export default GetMilestoneNameState; 