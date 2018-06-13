const {app, BrowserWindow} = require('electron')

function init() {
  
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    frame: false,
    backgroundColor: '#e00',
    webPreferences: {
      webSecurity: false
    }
  })
  win.loadURL( 'http://localhost:8080/' )
  // win.loadFile( 'index.html' )
}

app.on( 'ready', init )