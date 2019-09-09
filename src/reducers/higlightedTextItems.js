import { CLEAR_SELECTIONS, SAVE_SELECTED_TEXT } from 'actions/actionTypes'

const higlightedTextItems = (state = [], action) => {
  switch (action.type) {
    case SAVE_SELECTED_TEXT:
      const {color, selectionStart, selectionEnd, subtext} = action.option
      return [
        ...state,
        {selectionStart, selectionEnd, color, subtext}
      ].sort(
        (a,b) => a.selectionStart - b.selectionStart
      )
    case CLEAR_SELECTIONS:
      return []
    default:
      return state
  }
}

export default higlightedTextItems
