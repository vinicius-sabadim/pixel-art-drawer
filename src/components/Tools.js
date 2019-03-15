import React from 'react'

import Brush from '../assets/brush.png'
import Eraser from '../assets/eraser.png'
import Pencil from '../assets/pencil.png'

import './Tools.css'

export default function Tools({ mode, onChangeMode }) {
  return (
    <div className="tools">
      <div
        className={`icon ${mode === 'draw' ? 'icon--active' : ''}`}
        title="Draw"
        onClick={onChangeMode.bind(this, 'draw')}
      >
        <img src={Pencil} alt="Pencil by Denis Sazhin from the Noun Project" />
      </div>
      <div
        className={`icon ${mode === 'paint' ? 'icon--active' : ''}`}
        title="Paint"
        onClick={onChangeMode.bind(this, 'paint')}
      >
        <img src={Brush} alt="Brush by Denis Sazhin from the Noun Project" />
      </div>
      <div
        className={`icon ${mode === 'eraser' ? 'icon--active' : ''}`}
        title="Eraser"
        onClick={onChangeMode.bind(this, 'eraser')}
      >
        <img src={Eraser} alt="eraser by Maria Zamchy from the Noun Project" />
      </div>
    </div>
  )
}
