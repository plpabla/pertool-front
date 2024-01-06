import Konva from 'konva';
import Toolbox from '../Toolbox';

let sceneWidth = 900;
let sceneHeight = 700;

const stage = new Konva.Stage({
    height: sceneHeight,
    width: sceneWidth,
    container: "canvas",
    draggable: false
});

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

let toolbox = new Toolbox(layer);
toolbox.draw();
