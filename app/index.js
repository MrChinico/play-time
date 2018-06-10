const {app, BrowserWindow} = require('electron')

function init() {
  
  win = new BrowserWindow({ minWidth:800, minHeight: 600, width: 800, height: 600, frame: false })
  win.loadURL( 'http://localhost:8080/' )
  // win.loadFile( 'index.html' )
}

app.on( 'ready', init )