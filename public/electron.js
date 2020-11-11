const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron')
const fse = require('fs-extra')
const path = require('path')
const os = require('os')
const isDev = require('electron-is-dev')
const NodeID3 = require('node-id3')
const _ = require('lodash')
const { METADATA_COMPLETED, FETCH_AUDIO_FILES, CLICK_LIVE_FOLDER_BUTTON, SELECTED_FOLDER, MOVE_FILES_SELECTION } = require('../src/utils/constants');
const windowStateKeeper = require('electron-window-state')



let mainWindow

function createWindow () {

  let winState = windowStateKeeper({
    defaultWidth: 1200, defaultHeight: 600
  })

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x, y: winState.y,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    },
    titleBarStyle: 'hidden',
    frame: false,
    backgroundColor: '#fff'
  })

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file//${path.join(__dirname, "../build/index.html")}`
  )

  
  //enable garbage collector
  mainWindow.on("closed", () => {
    mainWindow = null;
  });   

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  winState.manage(mainWindow);
  const {default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

}

app.on('ready', () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(7)    /* all urls start with 'file://' */
    callback({ path: path.normalize(`${__dirname}/${url}`)})
  }, (err) => {
    if (err) console.error('Failed to register protocol')
  })
  createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// reads files that are dragged in table
ipcMain.on(FETCH_AUDIO_FILES, (event, files) => {
  
  const promises = _.map(files, (file) => {
    return new Promise((resolve, reject) => {
      NodeID3.read(file.path, (err, tags) => {
        file.tags = tags;
        resolve( file );
      })
    })
  });

  Promise.all(promises)
    .then(results => {
      mainWindow.webContents.send(METADATA_COMPLETED, results);
  });
});

// opens the showDialog to get the folder path. will set live folder view 
ipcMain.on(CLICK_LIVE_FOLDER_BUTTON, (event) => {
  if(os.platform() === 'linux' || os.platform() === 'win32') {
     dialog.showOpenDialog({
         properties: ['createDirectory', 'openDirectory', 'openFile']
     }).then(data => {
        if (data) event.sender.send(SELECTED_FOLDER, data.filePaths);
     })
  } else {
    dialog.showOpenDialog({
      properties: ['createDirectory', 'openDirectory', 'openFile']
    }).then(data => {
        if (data) event.sender.send(SELECTED_FOLDER, data.filePaths);
  })
  }
});






