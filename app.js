let sceneWidth = 1000;
let sceneHeight = 700;

const stage = new Konva.Stage({
    height: sceneHeight,
    width: sceneWidth,
    container: "canvas",
    draggable: false             // TODO: make draggable with mid mouse button pressed
});

/**********************************************
 * 
 **********************************************/
class Bubble {
    constructor(x, y, name) {
        this.image = createBubbleImage(x,y,name);
        this.name = name;
    }
}

function connectBubbles(lst, idA, idB, line) {
    const bA = lst.find((b)=>{return b.name===idA});
    const bB = lst.find((b)=>{return b.name===idB});
    if(bA==undefined || bB==undefined) {
        console.log("Bubble not found");
        return;
    }
    return bubbleConnector(bA.image, bB.image, line);
}
  /**********************************************
 * 
 **********************************************/

const layer = new Konva.Layer();
stage.add(layer);

layer.add(new Konva.Rect({
    x:2,
    y:2,
    width: stage.width()-4,
    height: stage.height()-4,
    stroke: "black",
    strokeWidth: 2
}));

const bubbles = [];
let connections = [];
bubbles.push(new Bubble(100,300, "A"));
bubbles.push(new Bubble(400,300, "B"));
bubbles.push(new Bubble(600,200, "C1"));
bubbles.push(new Bubble(700,500, "C2"));
bubbles.push(new Bubble(800,300, "x"));

connections.push(connectBubbles(bubbles, "A", "Cx"))
connections.push(connectBubbles(bubbles, "A", "B"))
connections.push(connectBubbles(bubbles, "B", "C1"))
connections.push(connectBubbles(bubbles, "B", "C2"))
connections.push(connectBubbles(bubbles, "C1", "x"))
connections.push(connectBubbles(bubbles, "C2", "x", true))
// Remove undefined values
connections = connections.filter(c=>c)

bubbles.forEach(b=>layer.add(b.image))
connections.forEach(c=>layer.add(c))

layer.draw();




function createBubbleImage(x,y,text) {
    const r = 30;
    const c = new Konva.Circle({
        x: 0,
        y: 0,
        fill: "white",
        stroke: "black",
        radius: r
    })

    const l1 = new Konva.Line({
        points: [-Math.sin(Math.PI/4)*r, -Math.cos(Math.PI/4)*r, Math.sin(Math.PI/4)*r, Math.cos(Math.PI/4)*r],
        stroke: "red"
    })
    const l2 = new Konva.Line({
        points: [Math.sin(Math.PI/4)*r, -Math.cos(Math.PI/4)*r, -Math.sin(Math.PI/4)*r, Math.cos(Math.PI/4)*r],
        stroke: "red"
    })

    const txt = new Konva.Text({
        x: 0,
        fontSize: 16,
        y: -0.7*r,
        text: text
    })
    // Center
    txt.offsetX(txt.width() / 2);

    const group = new Konva.Group({
        x: x,
        y: y,
        draggable: true
    })

    group.add(c);
    group.add(l1);
    group.add(l2);
    group.add(txt);

    return group;
}

function connector(x1, y1, x2, y2) {
    const r1 = 30;
    const r2 = 30;
    // TODO - shift
    const px1 = x1;
    const px2 = x2;
    const py1 = y1;
    const py2 = y2;
    return new Konva.Arrow({
        points: [px1, py1, px2, py2],
        stroke: "black"
    })
}

function calcPos(x1, y1, r1, x2, y2, r2) {
    const l = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
    const cosA = (x2-x1) / l;
    const sinA = (y2-y1) / l;
    // console.log(`Vector length: ${l}. cos(a)=${cosA}, sin(a)=${sinA}`)
    return {x1: x1 + r1*cosA,
            y1: y1 + r1*sinA,
            x2: x2 - r2*cosA,
            y2: y2 - r2*sinA}
}

function bubbleConnector(b1, b2, line) {
    console.log(line)
    let dash = [];
    if(line) {
        dash = [10, 5];
    }
    const pos = calcPos(b1.attrs.x,b1.attrs.y,30,b2.attrs.x,b2.attrs.y,30);
    const a = new Konva.Arrow({
        points: [pos.x1, pos.y1, pos.x2, pos.y2],
        stroke: "black",
        fill: "black",
        dash: dash,
        pointerLength: 20,
        pointerWidth: 15
    });

    b1.on('dragmove', () => {
        updatePos(a, b1, b2);
    });

    b2.on('dragmove', () => {
        updatePos(a, b1, b2);
    });

    a.on('mousedown', (evt) => {
        if(a.stroke()==="green")
        {
            a.stroke("black");
            a.fill("black");
        } else {
            a.stroke("green");
            a.fill("green");
        }
    });

    function updatePos(a, b1, b2) {
        const res = calcPos(b1.attrs.x,b1.attrs.y,30,b2.attrs.x,b2.attrs.y,30);
        a.attrs.points[0] = res.x1;
        a.attrs.points[1] = res.y1;
        a.attrs.points[2] = res.x2;
        a.attrs.points[3] = res.y2;
    }

    return a;
}


function fitStageIntoParentContainer() {
    var container = document.querySelector('#canvas-parent');

    // now we need to fit stage into parent container
    var containerWidth = container.offsetWidth;

    // but we also make the full scene visible
    // so we need to scale all objects on canvas
    var scale = containerWidth / sceneWidth;

    stage.width(sceneWidth * scale);
    stage.height(sceneHeight * scale);
    stage.scale({ x: scale, y: scale });
  }

  fitStageIntoParentContainer();
  // adapt the stage on any window resize
  window.addEventListener('resize', fitStageIntoParentContainer);