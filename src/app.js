"use strict"
import Konva from 'konva';
import Editor from './Editor';

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

