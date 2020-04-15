const autoUpdater = require('electron-updater').autoUpdater;
// `主进程`入口
const electron = require('electron');
// 控制app生命周期.
const app = electron.app;
// 浏览器窗口.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu



// 这里要注意一下，这里是让2浏览器窗口加载网页。
// 如果是开发环境，则url为http://localhost:3000（package.json中配置）
// 如果是生产环境l为build/index.html

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/#/page/page1`
    : `file://${__dirname}/index.html`
global._winURL = winURL;


function createWindow() {
    Menu.setApplicationMenu(null)
    // 创建一个浏览器窗口.
    mainWindow = new BrowserWindow({
        width: 800, height: 600,

        webPreferences: {
            nodeIntegration: true
        }
    });


    // 加载网页之后，会创建`渲染进程`
    mainWindow.loadURL(winURL);

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
