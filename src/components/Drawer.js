import React, { Component } from 'react'
import { ChromePicker, CirclePicker } from 'react-color'

import './Drawer.css'

export class Drawer extends Component {
  state = {
    activeColor: '#f44336',
    boxSize: 20,
    canvasHeight: 600,
    canvasWidth: 600,
    ctx: null,
    isEraserSelected: false
  }

  componentDidMount = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    this.setState({ ctx }, this.startGrid)
  }

  startGrid = () => {
    const { boxSize, canvasHeight, canvasWidth, ctx } = this.state
    for (let count = 0; count <= canvasWidth; count++) {
      ctx.moveTo(count * boxSize, 0)
      ctx.lineTo(count * boxSize, canvasHeight)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
    }
    for (let count = 0; count <= canvasHeight; count++) {
      ctx.moveTo(0, count * boxSize)
      ctx.lineTo(canvasWidth, count * boxSize)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
    }
  }

  handleClick = e => {
    const { boxSize } = this.state
    const { offsetX, offsetY } = e.nativeEvent
    const initX = parseInt(offsetX / boxSize, 10)
    const initY = parseInt(offsetY / boxSize, 10)
    this.draw(initX, initY)
  }

  draw = (initX, initY) => {
    const { activeColor, boxSize, ctx, isEraserSelected } = this.state
    if (isEraserSelected) {
      ctx.fillStyle = '#fff'
    } else {
      ctx.fillStyle = activeColor
    }

    ctx.fillRect(initX * boxSize, initY * boxSize, boxSize, boxSize)
    ctx.stroke()
  }

  handleMove = e => {
    if (e.buttons === 1) {
      const { boxSize } = this.state
      const { offsetX, offsetY } = e.nativeEvent
      const initX = parseInt(offsetX / boxSize, 10)
      const initY = parseInt(offsetY / boxSize, 10)
      this.draw(initX, initY)
    }
  }

  handleChangeColor = color => {
    this.setState({ activeColor: color.hex })
  }

  handleChangeEraser = () => {
    this.setState({ isEraserSelected: !this.state.isEraserSelected })
  }

  render() {
    const {
      activeColor,
      canvasHeight,
      canvasWidth,
      isEraserSelected
    } = this.state
    return (
      <div className="container">
        <canvas
          id="canvas"
          height={canvasHeight}
          width={canvasWidth}
          onClick={this.handleClick}
          onMouseMove={this.handleMove}
        />
        <div className="color__select">
          <ChromePicker
            color={activeColor}
            disableAlpha={true}
            onChange={this.handleChangeColor}
          />
          <div style={{ margin: '30px 0' }}>
            <CirclePicker
              color={activeColor}
              width="210px"
              onChange={this.handleChangeColor}
            />
          </div>
          <label className="eraser">
            <input
              type="checkbox"
              value={isEraserSelected}
              onChange={this.handleChangeEraser}
            />
            Eraser
          </label>
        </div>
      </div>
    )
  }
}

export default Drawer
