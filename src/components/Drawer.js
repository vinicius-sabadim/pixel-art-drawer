import React, { Component } from 'react'

import './Drawer.css'

const canvasHeight = 400
const canvasWidth = 600
const pixelSize = 20

export class Drawer extends Component {
  state = {
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
    ctx.fillStyle = '#ff0000'
    ctx.fillRect(initX * pixelSize, initY * pixelSize, pixelSize, pixelSize)
  }

  handleMove = e => {
    // console.log(e.nativeEvent.offsetX)
    // console.log(e.buttons)
  }

  render() {
    return (
      <div>
        <canvas
          id="canvas"
          height={canvasHeight}
          width={canvasWidth}
          onClick={this.handleClick}
          onMouseMove={this.handleMove}
        />
      </div>
    )
  }
}

export default Drawer
