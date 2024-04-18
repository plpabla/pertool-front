"use strict"
import Konva from 'konva';
import Editor from './Editor';
import Model from './Model';
import setAlertMessage from './alert';

let sceneWidth = 1000;
let sceneHeight = 700;
const stage = new Konva.Stage({
    height: sceneHeight,
    width: sceneWidth,
    container: "canvas",
    draggable: false             // TODO: make draggable with mid mouse button pressed
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

const editor = new Editor(stage);

window.onload = function() {
    fitStageIntoParentContainer();
    // adapt the stage on any window resize
    window.addEventListener('resize', fitStageIntoParentContainer);
    
    document.getElementById("btn-calculate").addEventListener("click", calculate);
    document.getElementById("btn-save").addEventListener("click", saveModel);
    document.getElementById("btn-load").addEventListener("click", loadModel);
    document.getElementById("btn-export").addEventListener("click", exportModel);
    document.getElementById("btn-import").addEventListener("click", importModel);
    document.getElementById("btn-clear").addEventListener("click", clearModel);
};


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

async function calculate(e) {
    const res = await editor.calculate();
    if(res.res==='ok') {
        setAlertMessage("Critical path calculated", "info")
    } else {
        setAlertMessage(res.msg, "danger")
    }
}

function clearModel(e) {
    editor.clear();
}

function exportModel(e) {
    const serialized = Model.serialize(editor.model);
    console.log(serialized);
}

function importModel(e) {
    console.log("TO DO"); 
}

function saveModel(e) {
    const serialized = Model.serialize(editor.model);
    localStorage.setItem("model", serialized);
}

function loadModel(e) {
    editor.clear(false);
    const serialized = localStorage.getItem("model");
    editor.load(serialized);
}