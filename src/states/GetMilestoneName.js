import State from "./State";

class GetMilestoneNameState extends State {
    constructor(context) {
        super(context);
        console.log("Create new GetMilestoneNameState");
        const pos = context.stage.getPointerPosition();
        const l = new Konva.Line({
            stroke: '#df4b26',
            strokeWidth: 5,
            globalCompositeOperation:'source-over',
            // round cap for smoother lines
            lineCap: 'round',
            lineJoin: 'round',
            // add point twice, so we have some drawings even on a simple click
            points: [pos.x, pos.y, pos.x, pos.y],
          });
        context.modelLayer.add(l);
        // TODO
        // const milestoneName = prompt("Milestone name");
        // console.log(milestoneName);
    }

    onClick(args) {
        const target = args.target;
        const clickedItem = target.attrs.name;
        console.log("GetMilestoneNameState. Click on item " + clickedItem);
        console.log(this.context);
        return this;
    }

    static getName() {
        return "GetMilestoneNameState";
    }
}

export default GetMilestoneNameState; 