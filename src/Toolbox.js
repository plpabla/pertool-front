import GraphicalElement from "./GraphicalElement";
// import Konva from 'konva';
import Milestone from "./Milestone";

class Toolbox extends GraphicalElement {
    constructor(layer) {
        super();
        this.layer = layer;
        this.createImg();
    }

    getImg() {
        console.log('TODO: drawing toolbox');
        this.milestoneTemplate.getImg();
    }

    createImg(args) {
        const BUBBLE_WIDTH = 70;
        const PADDING_X = 10;
        const PADDING_Y = 20;
        const MARGIN_Y = PADDING_Y;
        const POS_X = (BUBBLE_WIDTH + 2*PADDING_X)/2;
        const ARROW_WIDTH = BUBBLE_WIDTH;
        const ARROW_HEIGHT = BUBBLE_WIDTH/2;
        const LEGEND_HEIGHT = 500;
        let posY = BUBBLE_WIDTH/2 + MARGIN_Y;
        this.graphicalElements = [];

        const border = new Konva.Rect({
            x:2,
            y:2,
            width: BUBBLE_WIDTH + 2*PADDING_X,
            height: LEGEND_HEIGHT,
            stroke: "black",
            fill: "lightblue",
            strokeWidth: 2
        });
        this.graphicalElements.push(border);

        const m = new Milestone(POS_X,posY,"");
        posY += BUBBLE_WIDTH/2 + PADDING_Y;
        const mImg = m.getImg();
        mImg.draggable(false);
        this.graphicalElements.push(mImg);

        const l = new Konva.Arrow({
            points: [POS_X-ARROW_WIDTH/2, posY+ARROW_HEIGHT, POS_X+ARROW_WIDTH/2, posY],
            stroke: "black"
        });
        posY +=  ARROW_HEIGHT + PADDING_Y;
        this.graphicalElements.push(l);
    }

    draw() {
        this.graphicalElements.forEach(el => {
            this.layer.add(el);
        })
    }
}

export default Toolbox;