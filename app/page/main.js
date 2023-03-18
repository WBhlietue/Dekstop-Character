const { ipcRenderer } = require("electron");
const btns = document.querySelectorAll(".optionBtn");
const live2d = document.getElementById("live2d");
const live2dWidth = 600;
const live2dHeight = 672;
var scale = 1;
document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("CloseApplication");
});

document.getElementById("gotoGithub").addEventListener("click", () => {
  ipcRenderer.send("gotoGithub");
});

document.getElementById("drag").addEventListener("mousedown", () => {
  ipcRenderer.send("window-move-open", true);
});

document.getElementById("drag").addEventListener("mouseup", () => {
  ipcRenderer.send("window-move-open", false);
});
document.getElementById("changeSize").addEventListener("click", () => {
  ipcRenderer.send("openSizeWindow", scale);
});
document.getElementById("openSettingsWindow").addEventListener("click", () => {
  ipcRenderer.send("openSettingsWindow");
});
var btnWidth = "";
var optionBtnHide = true;
SetBtnSize();
var arrowBtn;
function SetBtnSize() {
  btnWidth = (window.innerWidth - 60) / 6;
  let btns = document.querySelectorAll(".btn");
  if (!optionBtnHide) {
    btns.forEach((i) => {
      i.style.width = btnWidth + "px";
      i.style.height = btnWidth + "px";
    });
  }
  arrowBtn = document.getElementById("arrow");
  arrowBtn.style.width = btnWidth + "px";
  arrowBtn.style.height = btnWidth + "px";
}

for (let i = 0; i < btns.length; i++) {
  btns[i].style.width = "0px";
  btns[i].style.height = "0px";
  btns[i].style.margin = "0px 0px";
  setTimeout(() => {
    btns[i].style.transition = "all 0.5s";
  }, 1);
}

arrowBtn.style.transition = "all 0.2s";

arrowBtn.addEventListener("click", () => {
  if (optionBtnHide) {
    optionBtnHide = false;
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.width = btnWidth + "px";
      btns[i].style.height = btnWidth + "px";
      btns[i].style.margin = "5px";
      arrowBtn.style.transform = "rotateZ(180deg)";
    }
  } else {
    optionBtnHide = true;
    for (let i = 0; i < btns.length; i++) {
      btns[i].style.width = "0px";
      btns[i].style.height = "0px";
      btns[i].style.margin = "0px 0px";
      arrowBtn.style.transform = "rotateZ(0deg)";
    }
  }
});

ipcRenderer.on("ChageSize", (event, val) => {
  ipcRenderer.send("changeSize", val);
  scale = val;
  setTimeout(() => {
    live2d.style.width = live2dWidth * val + "px";
    live2d.style.height = live2dHeight * val + "px";
    +"px";
    SetBtnSize();
  }, 50);
});
