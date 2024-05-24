const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

function createWindow() {
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon:"./src/assets/icon.jpg",
    frame:false,
    webPreferences:{
      nodeIntegration:true,
      contextIsolation:false
    }
    
  });

  mainWindow.loadFile('src/index.html');
}

ipcMain.on("minimize", ()=>{
  mainWindow.minimize();
})
ipcMain.on("maximize", ()=>{
  mainWindow.maximize();
})
ipcMain.on("close", ()=>{
   app.quit()
})

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


