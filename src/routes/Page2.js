import React, { Component } from 'react'

class App extends Component {
    onClick = () => {
    }
    render() {

        return (
            <div>
                Hello World
            <button onClick={this.onClick}>add</button>

            </div>
        );
    }
}
export default App
