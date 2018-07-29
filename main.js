const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const { ipcMain } = require('electron');
const { ipcRenderer } = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let second


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    resizable: false,
    width: 1450,
    height: 810,
    show: false,
  })

  // and load the index.html of the app.
  mainWindow.loadURL(path.join('file://', __dirname, '/src/index.html'))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Show the mainwindow when it is loaded and ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  second = new BrowserWindow({
    frame: false,
    //resizable: false,
    width: 400,
    height: 800,
    show: false,
    parent: mainWindow
  })

  second.loadURL(path.join('file://', __dirname, '/src/second.html'))
  //second.webContents.openDevTools()
  second.on('close', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    event.preventDefault(); //this prevents it from closing. The `closed` event will not fire now
    second.hide();

    
  })
  battle = new BrowserWindow({
    frame: false,
    //resizable: false,
    width: 400,
    height: 800,
    show: false,
    parent: mainWindow
  })

  battle.loadURL(path.join('file://', __dirname, '/src/battle.html'))
  //battle.webContents.openDevTools()
  battle.on('close', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    event.preventDefault(); //this prevents it from closing. The `closed` event will not fire now
    battle.hide();

    
  })
}
ipcMain.on('send_info', (event, arg) => {
  second.webContents.send('send_info_main', arg)
})

ipcMain.on('battle_info', (event, arg) => {
  battle.webContents.send('battle_info_main', arg)
})
ipcMain.on('reload-second-window', (event, arg) => {
  second.webContents.send('reload_info_main', arg)
})

ipcMain.on('przedmiot_main', (event, arg) => {
  mainWindow.webContents.send('przedmiot_get', arg)
})

ipcMain.on('open-second-window', (event, arg) => {
  event.preventDefault();
  second.show()
})

ipcMain.on('close-second-window', (event, arg) => {
  event.preventDefault();
  second.hide()
})

ipcMain.on('open-battle-window', (event, arg) => {
  event.preventDefault();
  battle.show()
})

ipcMain.on('close-battle-window', (event, arg) => {
  event.preventDefault();
  battle.hide()
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})