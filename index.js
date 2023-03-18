const {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  webContents,
  shell,
} = require("electron");

const initWidth = 300;
const initHeight = 500;

const fs = require("fs");
var data = JSON.parse(fs.readFileSync("app/data.json"));

const posX = parseInt(data.startX);
const posY = parseInt(data.startY);
const initScale = parseFloat(data.initScale);
const defModel = parseInt(data.defaultModel);
var model = defModel;

var width = initWidth;
var height = initHeight;
var win;
const createWindow = (pX, pY, m, s) => {
  pX = parseInt(
    ((screen.getPrimaryDisplay().bounds.width - width * s) * pX) / 100
  );
  pY = parseInt(
    ((screen.getPrimaryDisplay().bounds.height - height * s) * pY) / 100
  );
  if (pX < 10) {
    pX = 10;
  }
  console.log(pY);
  if (pY < 10) {
    pY = 10;
  }
  console.log(pY);
  win = new BrowserWindow({
    width: width,
    height: height,
    x: pX,
    y: pY,
    transparent: true,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  ipcMain.on("Test", () => {});
  ipcMain.on("CloseApplication", () => {
    app.quit();
  });
  ipcMain.on("changeSize", (event, x) => {
    ChangeWindowSize(x);
  });
  ipcMain.on("openSizeWindow", (event, val) => {
    sliderWindow(val);
  });
  ipcMain.on("openSettingsWindow", (event) => {
    settingsWindow();
  });
  ipcMain.on("gotoGithub", () => {
    shell.openExternal("https://github.com/WBhlietue/Dekstop-Character");
  });
  win.setAlwaysOnTop(true, "screen");
  win.loadURL(__dirname + "/app/page/index.html?modelName=" + m);
  windowMove(win);
  setTimeout(() => {
    win.webContents.send("ChageSize", s);
  }, 200);
};

const sliderWindow = (val) => {
  let sizeWindow = new BrowserWindow({
    width: 300,
    height: 125,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  ipcMain.once("closeSizeWindow", () => {
    sizeWindow.close();
  });
  ipcMain.once("setSizeWindowResult", (event, val) => {
    win.webContents.send("ChageSize", val);
    sizeWindow.close();
  });

  sizeWindow.removeMenu();
  sizeWindow.setAlwaysOnTop(true, "screen");
  sizeWindow.loadURL(__dirname + "/app/page/sizeSlider.html?val=" + val);
};
const settingsWindow = (val) => {
  let sizeWindow = new BrowserWindow({
    width: 500,
    height: 305,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  ipcMain.once("closeSettingsWindow", () => {
    var data = JSON.parse(fs.readFileSync("app/data.json"));
    let pX = parseInt(data.startX);
    let pY = parseInt(data.startY);
    let scale = parseFloat(data.initScale);
    let m = parseInt(data.defaultModel);

    win.loadURL(__dirname + "/app/page/index.html?modelName=" + m);
    setTimeout(() => {
      win.webContents.send("ChageSize", scale);
      pX = parseInt(
        ((screen.getPrimaryDisplay().bounds.width - width) * pX) / 100
      );
      pY = parseInt(
        ((screen.getPrimaryDisplay().bounds.height - height) * pY) / 100
      );
      if (pX < 10) {
        pX = 10;
      }
      if (pY < 10) {
        pY = 10;
      }

      win.setPosition(pX, pY);
    }, 200);
    sizeWindow.close();
  });

  sizeWindow.removeMenu();
  sizeWindow.setAlwaysOnTop(true, "screen");
  sizeWindow.loadURL(__dirname + "/app/page/settings.html");
};

app.whenReady().then(() => {
  createWindow(posX, posY, defModel, initScale);
  // settingsWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function ChangeWindowSize(x) {
  width = parseInt(initWidth * x);
  height = parseInt(initHeight * x);
  win.setSize(width, height);
}

function windowMove() {
  let winStartPosition = { x: 0, y: 0 };
  let mouseStartPosition = { x: 0, y: 0 };
  let movingInterval = null;

  ipcMain.on("window-move-open", (events, canMoving) => {
    if (canMoving) {
      const winPosition = win.getPosition();
      winStartPosition = { x: winPosition[0], y: winPosition[1] };
      mouseStartPosition = screen.getCursorScreenPoint();
      if (movingInterval) {
        clearInterval(movingInterval);
      }
      movingInterval = setInterval(() => {
        const cursorPosition = screen.getCursorScreenPoint();
        const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
        const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
        win.setPosition(x, y, false);
        win.setSize(width, height);
      }, 5);
    } else {
      clearInterval(movingInterval);
      movingInterval = null;
    }
  });
}
