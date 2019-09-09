import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ColorBox, { ColorBoxPropTypes } from 'components/InteractiveColorRow/ColorBox'
import './index.scss'

/* Ensures the color box will be toggle it's highlight properly 
 * based in if allows multiple selections or not 
 */
const colorBoxIsHighlightedUpdater = (i, multipleSelections) => (colorBox, j) => ({
  ...colorBox,
  isHighlighted: multipleSelections 
    ? (i === j ? !colorBox.isHighlighted : colorBox.isHighlighted)
    : i === j
})

const InteractiveColorBoxRow = ({
  colorBoxes, onSelectedColorRow, descriptionText, multipleSelections
}) => {
  const [currentColorBoxes, updateColorBoxes] = useState(colorBoxes)
  
  /* Sends to the callback the current selected Color Boxes */
  useEffect(() => onSelectedColorRow(currentColorBoxes.filter(
    colorBox => colorBox.isHighlighted
  ).map(
    colorBox => colorBox.background
  )),
    [currentColorBoxes, onSelectedColorRow]
  )

  return (
    <ul className="interactive-color-box-row">
      {currentColorBoxes.map((props, i) => (
        <li
          data-testid={`color-box-row-${i}`} 
          key={`color-box-row-${i}`} 
          className="item"
          onClick={() => updateColorBoxes(currentColorBoxes.map(
            colorBoxIsHighlightedUpdater(i, multipleSelections)
          ))}>
          <ColorBox {...props} />
        </li>
      ))}
      <li>{descriptionText}</li>
    </ul>
  )
}

export const InteractiveColorBoxRowPropTypes = {
  colorBoxes: PropTypes.arrayOf(PropTypes.shape(ColorBoxPropTypes)),
  onSelectedColorRow: PropTypes.func,
  descriptionText: PropTypes.string,
  multipleSelections: PropTypes.bool
}

InteractiveColorBoxRow.propTypes = InteractiveColorBoxRowPropTypes

InteractiveColorBoxRow.defaultProps = {
  colorBoxes: [],
  onSelectedColorRow: () => {},
  descriptionText: '',
  multipleSelections: false
}

export default InteractiveColorBoxRow