import React, { Component } from 'react'

import electron from "electron";



class App extends Component {
    
    onClick = () => {
        console.log("********123*** ",electron)
        // ipcRenderer.sendSync('synchronous-message', 'ping'); // prints "pong"

        // ipcRenderer.on('asynchronous-reply', function(event, arg) {
        //   console.log(arg); // prints "pong"
        // });
        // ipcRenderer.send('asynchronous-message', 'ping');
    }
    render() {

        return (
            <div>
                2222222222222222
            <button onClick={this.onClick}>add</button>

            </div>
        );
    }
}

export default App
