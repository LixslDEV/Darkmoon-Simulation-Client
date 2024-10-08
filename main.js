// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    title: "Darkmoon Client",
    width: 1500,
    height: 1100,
    icon: __dirname + '/misc/favicon.png',
    resizable: true,  // This line disables window resizing
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.removeMenu()
  mainWindow.loadURL('https://darkmoon.gg')

  mainWindow.webContents.on('did-finish-load', () => {
 
    mainWindow.webContents.insertCSS(`
        .download-button {
            visibilty: collapsed !important;
        }
    `);
  })

  // open urls in External Browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
