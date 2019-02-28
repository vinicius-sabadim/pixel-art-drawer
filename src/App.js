import React, { Component } from 'react'

import Drawer from './components/Drawer'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App__title">Pixel Art Drawer</h1>
        <Drawer />
      </div>
    )
  }
}

export default App
