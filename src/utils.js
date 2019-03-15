export const colors = [
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
]

export const isMouseClicked = event => {
  return event.buttons === 1
}

export const rgbToHex = (r, g, b) => {
  if (r > 255 || g > 255 || b > 255) throw new Error('Invalid color component')
  return ((r << 16) | (g << 8) | b).toString(16)
}
