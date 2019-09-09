import React, {useState, useRef, Fragment} from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const TextHighlightableArea = ({initialText, onChangeText, onSelectedText, highlightMarkers}) => {
  const [text, setText] = useState(initialText)
  const textareaEl = useRef(null)

  /* Callbacks */
  const handleSelection = () => {
    const {selectionStart, selectionEnd} = textareaEl.current
    if (selectionStart !== selectionEnd) onSelectedText(selectionStart, selectionEnd)
  }
  
  const handleInput = (event) => {
    const newText = event.target.value
    onChangeText(newText)
    setText(newText)
  }
  
  /* Renders */

  /* Renders the text previous to the marked text and them the marker, 
   * the rest is being handle in posterior interations that will keep consuming the buffer.
   * Marker are consider to be consider already ordered ( this is being done by the reducer ).
   */
  const renderHighlights = (input, highlightMarkers) => {
    let offset = 0
    let buffer = input
    return highlightMarkers.length ? highlightMarkers.map(
      ({selectionStart, selectionEnd, color}, idx) => {
        const result = (
          <Fragment key={idx}>
            {buffer.slice(0, selectionStart - offset)}
            <mark style={{backgroundColor: color}}>{
              buffer.slice(selectionStart - offset, selectionEnd - offset
            )}</mark>
          </Fragment>
        )
        buffer = buffer.slice(selectionEnd - offset)
        offset = selectionEnd
        return result
      }        
    ) : buffer
  }

  return (
    <div className="text-highlightable-area">
      <div className="backdrop">
        <div 
          className="highlights"
          data-testid="highlights"
        >{
          renderHighlights(text, highlightMarkers)
        }</div>
      </div>
      <textarea
        data-testid="text-area"
        ref={textareaEl}
        value={text}
        onTouchEnd={handleSelection} 
        onClick={handleSelection}
        onChange={handleInput}
      />
    </div>
  )
}

export const TextHighlightableAreaPropTypes = {
  initialText: PropTypes.string,
  onChangeText: PropTypes.func,
  onSelectedText: PropTypes.func,
  highlightMarkers: PropTypes.arrayOf(PropTypes.shape({
    selectionStart: PropTypes.number,
    selectionEnd: PropTypes.number,
    color: PropTypes.string
  }))
}

TextHighlightableArea.propTypes = TextHighlightableAreaPropTypes

TextHighlightableArea.defaultProps = {
  initialText: "",
  onChangeText: () => {},
  onSelectedText: () => {},
  highlightMarkers: []
}

export default TextHighlightableArea