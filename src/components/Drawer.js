import React, { Component } from 'react'

import './Drawer.css'

const canvasHeight = 400
const canvasWidth = 600
const pixelSize = 20

export class Drawer extends Component {
  state = {
    activeColor: '#ff0000',
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    ctx: null
  }

  componentDidMount = () => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    this.setState({ ctx }, this.startGrid)
  }

  startGrid = () => {
    const { ctx } = this.state
    for (let count = 0; count <= canvasWidth; count++) {
      ctx.moveTo(count * pixelSize, 0)
      ctx.lineTo(count * pixelSize, canvasHeight)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
    }
    for (let count = 0; count <= canvasHeight; count++) {
      ctx.moveTo(0, count * pixelSize)
      ctx.lineTo(canvasWidth, count * pixelSize)
      ctx.strokeStyle = '#ccc'
      ctx.stroke()
    }
  }

  handleClick = e => {
    const { offsetX, offsetY } = e.nativeEvent
    const initX = parseInt(offsetX / pixelSize, 10)
    const initY = parseInt(offsetY / pixelSize, 10)

    const { ctx } = this.state
    ctx.fillStyle = this.state.activeColor
    ctx.fillRect(initX * pixelSize, initY * pixelSize, pixelSize, pixelSize)
  }

  handleMove = e => {
    // console.log(e.nativeEvent.offsetX)
    // console.log(e.buttons)
  }

  handleChangeColor = color => {
    this.setState({ activeColor: color })
  }

  render() {
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
          <ul className="color__select-menu">
            {this.state.colors.map(color => (
              <li
                className="color"
                key={color}
                style={{ backgroundColor: color }}
                onClick={this.handleChangeColor.bind(this, color)}
              />
            ))}
          </ul>
          <span>Active color</span>
          <div
            className="active__color"
            style={{ backgroundColor: this.state.activeColor }}
          />
        </div>
      </div>
    )
  }
}

export default Drawer
