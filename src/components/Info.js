import React from 'react'

import './Info.css'

export default function Info({
  boxSize,
  canvasHeight,
  canvasWidth,
  onChangeInput
}) {
  return (
    <div className="info">
      <div className="input">
        <label>Pixel</label>
        <input
          min="10"
          name="boxSize"
          step="5"
          type="number"
          value={boxSize}
          onChange={onChangeInput}
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
          onChange={onChangeInput}
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
          onChange={onChangeInput}
        />
      </div>
    </div>
  )
}
