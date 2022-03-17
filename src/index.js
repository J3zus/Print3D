const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

function CreateainWindow(){

    let mainWindow   //Alcanze global para despues si se elimina queda limpio los recursos del computador

    mainWindow = new BrowserWindow({
        backgroundColor: '#4B709A',
        width: 970,
        height: 714,
        center: true,
        resizable: false, //Este comando es para evitar que se reescale la ventana
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        },
        icon: __dirname + './Icon/Favicon.png',
        //frame: false <- Quita los bordes de la ventana
        show: true
        
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    mainWindow.setMenu(null); //Remueve la barra de menu que pone electron
    //mainWindow.webContents.openDevTools() //Abre la ventana donde esta la consola;

}


app.whenReady().then(() => {
    CreateainWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            CreateainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})