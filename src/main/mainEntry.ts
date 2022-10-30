import { app, BrowserWindow } from "electron";
import { CommonWindowEvent } from "./commonWindowEvent";
import { CustomScheme } from "./customScheme";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  let config = {
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
      nativeWindowOpen: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: "undocked" });
  mainWindow.webContents.setWindowOpenHandler((param: { [x: string]: any }) => {
    //基础窗口配置对象
    let config: { [x: string]: any } = {
      frame: false,
      show: true,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        allowRunningInsecureContent: true,
        contextIsolation: false,
        webviewTag: true,
        spellcheck: false,
        disableHtmlFullscreenWindowResize: true,
        nativeWindowOpen: true,
      },
    };
    //开发者自定义窗口配置对象
    let features = JSON.parse(param.features);
    // for (let p in features) {
    //   if (p === "webPreferences") {
    //     for (let p2 in features.webPreferences) {
    //       config.webPreferences[p2] = features.webPreferences[p2];
    //     }
    //   } else {
    //     config[p] = features[p];
    //   }
    // }

    const { webPreferences, ...other } = features;

    config.webPreferences = { ...webPreferences, ...config.webPreferences };

    config = { ...other, ...config };

    if (config.modal === true) {
      config.parent = win;
    }

    return {
      action: "allow",
      overrideBrowserWindowOptions: config,
    };
  });
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
  }
});

app.on("browser-window-created", (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});
