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

  fillCell = e => {
    console.log(e)
  }

  render() {
    return (
      <div>
        <canvas
          id="canvas"
          height={canvasHeight}
          width={canvasWidth}
          onMouseMove={this.fillCell}
        />
      </div>
    )
  }
}

export default Drawer
