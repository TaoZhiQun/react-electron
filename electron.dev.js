

require('electron-debug')({ showDevTools: true })

// Require `main` process to boot app
require('./electron/electron.js')
