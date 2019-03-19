import React, { Component } from 'react'
import { ChromePicker, CirclePicker } from 'react-color'

import Info from './Info'
import Tools from './Tools'

import { colors, isMouseClicked, rgbToHex } from '../utils'

import './Drawer.css'

export class Drawer extends Component {
  state = {
    activeColor: '#f44336',
    boxSize: 25,
    canvasHeight: 700,
    canvasWidth: 700,
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
    const { activeColor, boxSize, mode } = this.state
    const { offsetX, offsetY } = e.nativeEvent
    const initX = parseInt(offsetX / boxSize, 10)
    const initY = parseInt(offsetY / boxSize, 10)

    if (mode === 'paint') {
      this.paint(initX, initY, this.getColorOfBox(initX, initY))
    } else {
      this.draw(initX, initY, activeColor)
    }
  }

  handleMove = e => {
    if (this.state.mode === 'paint') return

    const { boxSize } = this.state
    const { offsetX, offsetY } = e.nativeEvent

    if (isMouseClicked(e)) {
      const initX = parseInt(offsetX / boxSize, 10)
      const initY = parseInt(offsetY / boxSize, 10)
      this.draw(initX, initY)
    }
  }

  paint = (initX, initY, colorToPaintOver) => {
    const colorOfBox = this.getColorOfBox(initX, initY)
    const colorToPaint = this.getColor()

    if (colorOfBox === colorToPaintOver) {
      this.draw(initX, initY, colorToPaint)
    }

    if (this.getColorOfBox(initX - 1, initY) === colorToPaintOver) {
      this.paint(initX - 1, initY, colorToPaintOver)
    }
    if (this.getColorOfBox(initX + 1, initY) === colorToPaintOver) {
      this.paint(initX + 1, initY, colorToPaintOver)
    }
    if (this.getColorOfBox(initX, initY - 1) === colorToPaintOver) {
      this.paint(initX, initY - 1, colorToPaintOver)
    }
    if (this.getColorOfBox(initX, initY + 1) === colorToPaintOver) {
      this.paint(initX, initY + 1, colorToPaintOver)
    }
  }

  getColorOfBox = (initX, initY) => {
    const { boxSize, ctx } = this.state
    const [r, g, b] = ctx.getImageData(
      initX * boxSize + 1,
      initY * boxSize + 1,
      1,
      1
    ).data
    return rgbToHex(r, g, b)
  }

  handleChangeColor = color => {
    this.setState({ activeColor: color.hex })
  }

  handleChangeMode = mode => {
    this.setState({ mode })
  }

  handleChangeInput = event => {
    const { name, value } = event.target
    if (!value) return

    this.setState({ [name]: parseInt(value, 10) }, this.startGrid)
  }

  draw = (initX, initY, color) => {
    const { boxSize, ctx } = this.state
    ctx.fillStyle = color ? color : this.getColor()
    ctx.strokeStyle = '#ccc'
    ctx.fillRect(initX * boxSize, initY * boxSize, boxSize, boxSize)
    ctx.strokeRect(initX * boxSize, initY * boxSize, boxSize, boxSize)
  }

  getColor = () => {
    const { activeColor, mode } = this.state
    if (mode === 'eraser') return '#fff'
    return activeColor
  }

  render() {
    const { activeColor, canvasHeight, canvasWidth } = this.state

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
          <Info
            boxSize={this.state.boxSize}
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
            onChangeInput={this.handleChangeInput}
          />
          <ChromePicker
            color={activeColor}
            disableAlpha={true}
            onChange={this.handleChangeColor}
          />
          <div style={{ margin: '30px 0' }}>
            <CirclePicker
              color={activeColor}
              colors={colors}
              width="210px"
              onChange={this.handleChangeColor}
            />
          </div>
          <Tools mode={this.state.mode} onChangeMode={this.handleChangeMode} />
        </div>
      </div>
    )
  }
}

export default Drawer
