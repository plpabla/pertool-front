"use strict";
import Konva from "konva";
import Editor from "./Editor";
import Model from "./Model";
import setAlertMessage from "./alert";

let sceneWidth = window.innerWidth * 0.9;
let sceneHeight = window.innerHeight * 0.8;
const stage = new Konva.Stage({
  height: sceneHeight,
  width: sceneWidth,
  container: "canvas",
  draggable: false, // TODO: make draggable with mid mouse button pressed
});
const border = new Konva.Rect({
  x: 2,
  y: 2,
  width: stage.width() - 4,
  height: stage.height() - 4,
  stroke: "black",
  strokeWidth: 2,
});

const layer = new Konva.Layer();
stage.add(layer);

layer.add(border);

const editor = new Editor(stage, calculate);

window.onload = function () {
  fitStageIntoParentContainer();
  // adapt the stage on any window resize
  window.addEventListener("resize", fitStageIntoParentContainer);

  document.getElementById("btn-save").addEventListener("click", saveModel);
  document.getElementById("btn-load").addEventListener("click", loadModel);
  document.getElementById("btn-export").addEventListener("click", exportModel);
  document.getElementById("btn-import").addEventListener("click", importModel);
  document.getElementById("btn-clear").addEventListener("click", clearModel);

  calculate();
};

function fitStageIntoParentContainer() {
  let sceneWidth = window?.innerWidth * 0.9 ?? 1000;
  let sceneHeight = window?.innerHeight * 0.8 ?? 700;

  stage.width(sceneWidth);
  stage.height(sceneHeight);
  border.width(sceneWidth - 4);
  border.height(sceneHeight - 4);
}

async function calculate(e) {
  let res = await editor.calculate();

  if (res.res === "ok") {
    setAlertMessage("Critical path calculated", "info");
    return 0;
  } else {
    setAlertMessage(res.msg, "danger");
    return 1;
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
  calculate();
}

window.onresize = function () {
  fitStageIntoParentContainer();
};
