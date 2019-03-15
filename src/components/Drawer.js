import React, { Component } from 'react'
import { ChromePicker, CirclePicker } from 'react-color'

import { rgbToHex } from '../utils'

import './Drawer.css'

import Brush from '../assets/brush.png'
import Eraser from '../assets/eraser.png'
import Pencil from '../assets/pencil.png'

export class Drawer extends Component {
  state = {
    activeColor: '#f44336',
    boxSize: 20,
    canvasHeight: 600,
    canvasWidth: 600,
    ctx: null,
    mode: 'draw'
  }

  componentDidMount = () => {
    const ctx = document.getElementById('canvas').getContext('2d')
    this.setState({ ctx }, this.startGrid)
  }

  startGrid = () => {
    const { boxSize, canvasHeight, canvasWidth } = this.state
    const totalBoxHorizontal = parseInt(canvasWidth / boxSize, 10)
    const totalBoxVertical = parseInt(canvasHeight / boxSize, 10)

    for (let initX = 0; initX < totalBoxHorizontal; initX++) {
      for (let initY = 0; initY < totalBoxVertical; initY++) {
        this.draw(initX, initY, '#fff')
      }
    }
  }

  handleClick = e => {
    const { activeColor, boxSize } = this.state
    const { offsetX, offsetY } = e.nativeEvent
    const initX = parseInt(offsetX / boxSize, 10)
    const initY = parseInt(offsetY / boxSize, 10)

    this.draw(initX, initY, activeColor)
  }

  draw = (initX, initY, color) => {
    if (this.state.mode === 'paint') return

    const { boxSize, ctx } = this.state
    ctx.fillStyle = color
    ctx.strokeStyle = '#ccc'
    ctx.fillRect(initX * boxSize, initY * boxSize, boxSize, boxSize)
    ctx.strokeRect(initX * boxSize, initY * boxSize, boxSize, boxSize)
  }

  handleMove = e => {
    const { boxSize, ctx } = this.state
    const { offsetX, offsetY } = e.nativeEvent
    if (e.buttons === 1) {
      const initX = parseInt(offsetX / boxSize, 10)
      const initY = parseInt(offsetY / boxSize, 10)
      this.draw(initX, initY)
    } else {
      const [r, g, b] = ctx.getImageData(offsetX, offsetY, 1, 1).data
      console.log(rgbToHex(r, g, b))
    }
  }

  handleChangeColor = color => {
    this.setState({ activeColor: color.hex })
  }

  changeMode = mode => {
    this.setState({ mode })
  }

  handleChangeInput = event => {
    const { name, value } = event.target
    if (!value) return

    this.setState({ [name]: parseInt(value, 10) }, this.startGrid)
  }

  render() {
    const { activeColor, boxSize, canvasHeight, canvasWidth, mode } = this.state

    return (
      <div className="container">
        <canvas
          id="canvas"
          height={canvasHeight}
          width={canvasWidth}
          style={{ height: canvasHeight, width: canvasWidth }}
          onClick={this.handleClick}
          onMouseMove={this.handleMove}
        />
        <div className="panel">
          <div className="info">
            <div className="input">
              <label>Pixel</label>
              <input
                name="boxSize"
                step="10"
                type="number"
                value={boxSize}
                onChange={this.handleChangeInput}
              />
            </div>
            <div className="input">
              <label>Width</label>
              <input
                min={boxSize}
                name="canvasWidth"
                step={boxSize}
                type="number"
                value={canvasWidth}
                onChange={this.handleChangeInput}
              />
            </div>
            <div className="input">
              <label>Height</label>
              <input
                min={boxSize}
                name="canvasHeight"
                step={boxSize}
                type="number"
                value={canvasHeight}
                onChange={this.handleChangeInput}
              />
            </div>
          </div>
          <ChromePicker
            color={activeColor}
            disableAlpha={true}
            onChange={this.handleChangeColor}
          />
          <div style={{ margin: '30px 0' }}>
            <CirclePicker
              color={activeColor}
              colors={[
                '#f44336',
                '#e91e63',
                '#FF00EB',
                '#9c27b0',
                '#673ab7',
                '#3f51b5',
                '#2196f3',
                '#03a9f4',
                '#00bcd4',
                '#009688',
                '#4caf50',
                '#8bc34a',
                '#cddc39',
                '#ffeb3b',
                '#ffc107',
                '#ff9800',
                '#ff5722',
                '#795548',
                '#607d8b',
                '#000000'
              ]}
              width="210px"
              onChange={this.handleChangeColor}
            />
          </div>
          <div className="tools">
            <div
              className={`icon ${mode === 'draw' ? 'icon--active' : ''}`}
              title="Draw"
              onClick={this.changeMode.bind(this, 'draw')}
            >
              <img
                src={Pencil}
                alt="Pencil by Denis Sazhin from the Noun Project"
              />
            </div>
            <div
              className={`icon ${mode === 'paint' ? 'icon--active' : ''}`}
              title="Paint"
              onClick={this.changeMode.bind(this, 'paint')}
            >
              <img
                src={Brush}
                alt="Brush by Denis Sazhin from the Noun Project"
              />
            </div>
            <div
              className={`icon ${mode === 'eraser' ? 'icon--active' : ''}`}
              title="Eraser"
              onClick={this.changeMode.bind(this, 'eraser')}
            >
              <img
                src={Eraser}
                alt="eraser by Maria Zamchy from the Noun Project"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Drawer
