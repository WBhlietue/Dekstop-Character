const { ipcRenderer } = require("electron");
const slider = document.getElementById("slider");
const valueLabel = document.getElementById("value");
var urlpar = new URLSearchParams(window.location.search);
let num = (urlpar.get("val"));
num = parseInt(num * 100);
slider.value = num;
valueLabel.innerHTML = (slider.value / 100).toFixed(2);
document.getElementById("set").addEventListener("click", () => {
  ipcRenderer.send("setSizeWindowResult", slider.value / 100);
});
document.getElementById("cancel").addEventListener("click", () => {
  ipcRenderer.send("closeSizeWindow");
});
slider.addEventListener("input", () => {
  valueLabel.innerHTML = (slider.value / 100).toFixed(2);
});
