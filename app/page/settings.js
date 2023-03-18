const { ipcRenderer } = require("electron");
var fs = require("fs");
var jsonData;
fs.readFile("app/data.json", (err, data) => {
  jsonData = JSON.parse(data);
  defModel = jsonData.defaultModel;
  startX = jsonData.startX;
  startY = jsonData.startY;
  scale = jsonData.initScale;
  InitDatas();
});
document.getElementById("saveBtn").addEventListener("click", () => {
  jsonData.defaultModel = defModel;
  jsonData.startX = startX;
  jsonData.startY = startY;
  jsonData.initScale = scale;
  fs.writeFileSync("app/data.json", JSON.stringify(jsonData));
  ipcRenderer.send("closeSettingsWindow");
});

document.getElementById("defaultBtn").addEventListener("click", () => {
  jsonData.defaultModel = jsonData.defaultData.defaultModel;
  jsonData.startX = jsonData.defaultData.startX;
  jsonData.startY = jsonData.defaultData.startY;
  jsonData.initScale = jsonData.defaultData.initScale;
  defModel = jsonData.defaultModel;
  startX = jsonData.startX;
  startY = jsonData.startY;
  scale = jsonData.initScale;
  InitDatas();
  fs.writeFileSync("app/data.json", JSON.stringify(jsonData));
});
