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
    x:0,
    y:0,
    width: stage.width(),
    height: stage.height(),
    stroke: "black",
    strokeWidth: 2
}));

let toolbox = new Toolbox(layer);
toolbox.bind("cursor", () => {console.log("cursor clicked")});
toolbox.bind("milestone", () => {console.log("milestone clicked")});
toolbox.bind("link", () => {console.log("link clicked")});
toolbox.bind("fake-link", () => {console.log("fake-link clicked")});
