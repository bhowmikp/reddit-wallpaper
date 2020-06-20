const electron = require("electron");
const { ipcMain } = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");

const { Reddit } = require("./server/service/RedditService");
const { download } = require("electron-dl");
const wallpaper = require("wallpaper");
const Jimp = require("jimp");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: { nodeIntegration: true }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const reddit = new Reddit();

ipcMain.handle("get-data", async (event, args) => {
  const result = await reddit.getData(args);
  return JSON.stringify(result);
});

ipcMain.handle("set-wallpaper", async (event, url) => {
  const extension = url.split(".").slice(-1)[0];

  const filenameWithoutExtension = "reddit-wallpaper";
  const filenameWithExtension = `reddit-wallpaper.${extension}`;
  const filePath = app.getPath("downloads") + "/";

  // remove if name already present
  fs.unlink(filePath + filenameWithExtension, () => {});

  const win = BrowserWindow.getFocusedWindow();
  await download(win, url, { filename: filenameWithExtension });

  // convert png to jpg
  if (extension === "png") {
    const jimpPicture = await Jimp.read(filePath + filenameWithExtension);
    jimpPicture
      .quality(100)
      .write(filePath + filenameWithoutExtension + ".jpg");

    // remove png version
    fs.unlink(filePath + filenameWithExtension, () => {});
  }

  await wallpaper.set(filePath + filenameWithoutExtension + ".jpg", {
    scale: "stretch"
  });
});
