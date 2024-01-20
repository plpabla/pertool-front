import Konva from 'konva';
import Editor from '../Editor';
import InputBox from '../InputBox';

let sceneWidth = 900;
let sceneHeight = 700;

const stage = new Konva.Stage({
    height: sceneHeight,
    width: sceneWidth,
    container: "canvas",
    draggable: false,
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

const editor = new Editor(stage);
editor.testUpdate();

// const prompt = new InputBox(layer, "Please enter something:", {x: 100, y: 200}, (txt) => {
//     console.log("text: " + txt);
// });
