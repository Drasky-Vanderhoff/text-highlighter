import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TextHighlightableArea from './'
import renderer from 'react-test-renderer'

describe('TextHighlightableArea Component', () => {
  test('should render with default values', () => {
    expect(
      renderer.create(<TextHighlightableArea />).toJSON()
    ).toMatchSnapshot()
  })

  test('should render with text highlighted', () => {
    const props = {
      initialText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      highlightMarkers: [
        {
          selectionStart: 0,
          selectionEnd: 5,
          color: "red"
        },
        {
          selectionStart: 12,
          selectionEnd: 21,
          color: "blue"
        }
      ]
    }
    expect(
      renderer.create(<TextHighlightableArea {...props}/>).toJSON()
    ).toMatchSnapshot()
  })

  test('should call change text callback handler when text is changed by the user in the text area', () => {
    const props = {
      initialText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      onChangeText: jest.fn()
    }
    const newText = "This is the new text"
    const {getByTestId} = render(<TextHighlightableArea {...props} />)
    /* Precondition */
    expect(getByTestId("text-area")).toHaveTextContent(props.initialText) 
    expect(getByTestId("highlights")).toHaveTextContent(props.initialText)
    expect(props.onChangeText).toHaveBeenCalledTimes(0)

    /* Action */
    fireEvent.change(getByTestId("text-area"), {target: { value: newText}})

    /* Postcondition */
    expect(getByTestId("text-area")).toHaveTextContent(newText)
    expect(getByTestId("highlights")).toHaveTextContent(newText)
    expect(props.onChangeText).toHaveBeenCalledTimes(1)
    expect(props.onChangeText).toHaveBeenCalledWith(newText)
  })

  test('should call change text callback handler when text is changed by the user in the text area and update the highlight area', () => {
    const props = {
      initialText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      onChangeText: jest.fn()
    }
    const newText = "This is the new text"
    const {getByTestId} = render(<TextHighlightableArea {...props} />)
    /* Precondition */
    expect(getByTestId("text-area")).toHaveTextContent(props.initialText) 
    expect(getByTestId("highlights")).toHaveTextContent(props.initialText)
    expect(props.onChangeText).toHaveBeenCalledTimes(0)

    /* Action */
    fireEvent.change(getByTestId("text-area"), {target: { value: newText}})

    /* Postcondition */
    expect(getByTestId("text-area")).toHaveTextContent(newText)
    expect(getByTestId("highlights")).toHaveTextContent(newText)
    expect(props.onChangeText).toHaveBeenCalledTimes(1)
    expect(props.onChangeText).toHaveBeenCalledWith(newText)
  })
  
  test('should call selection text callback handler when text is selected in desktop environment', () => {
    const props = {
      initialText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      onSelectedText: jest.fn()
    }
    const [selectionStart, selectionEnd] = [0, 5]
    
    const {getByTestId} = render(<TextHighlightableArea {...props} />)
    /* Precondition */
    expect(getByTestId("text-area")).toHaveTextContent(props.initialText) 
    expect(getByTestId("highlights")).toHaveTextContent(props.initialText)
    expect(props.onSelectedText).toHaveBeenCalledTimes(0)
    
    /* Action */
    fireEvent.click(getByTestId("text-area"), {target: { selectionStart, selectionEnd}})

    /* Postcondition */
    expect(props.onSelectedText).toHaveBeenCalledTimes(1)
    expect(props.onSelectedText).toHaveBeenCalledWith(selectionStart, selectionEnd)
  })  
  
  test('should not call selection text callback handler when text selection is empty in desktop environment', () => {
    const props = {
      initialText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      onSelectedText: jest.fn()
    }
    const [selectionStart, selectionEnd] = [5, 5]
    
    const {getByTestId} = render(<TextHighlightableArea {...props} />)
    /* Precondition */
    expect(getByTestId("text-area")).toHaveTextContent(props.initialText) 
    expect(getByTestId("highlights")).toHaveTextContent(props.initialText)
    expect(props.onSelectedText).toHaveBeenCalledTimes(0)
    
    /* Action */
    fireEvent.click(getByTestId("text-area"), {target: { selectionStart, selectionEnd}})

    /* Postcondition */
    expect(props.onSelectedText).toHaveBeenCalledTimes(0)
  })
  
  test('should call selection text callback handler when text is selected in mobile environment', () => {
    const props = {
      initialText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      onSelectedText: jest.fn()
    }
    const [selectionStart, selectionEnd] = [0, 5]
    
    const {getByTestId} = render(<TextHighlightableArea {...props} />)
    /* Precondition */
    expect(getByTestId("text-area")).toHaveTextContent(props.initialText) 
    expect(getByTestId("highlights")).toHaveTextContent(props.initialText)
    expect(props.onSelectedText).toHaveBeenCalledTimes(0)
    
    /* Action */
    fireEvent.touchEnd(getByTestId("text-area"), {target: { selectionStart, selectionEnd}})

    /* Postcondition */
    expect(props.onSelectedText).toHaveBeenCalledTimes(1)
    expect(props.onSelectedText).toHaveBeenCalledWith(selectionStart, selectionEnd)
  })
  
  test('should not call selection text callback handler when text selection is empty in mobile environment', () => {
    const props = {
      initialText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      onSelectedText: jest.fn()
    }
    const [selectionStart, selectionEnd] = [5, 5]
    
    const {getByTestId} = render(<TextHighlightableArea {...props} />)
    /* Precondition */
    expect(getByTestId("text-area")).toHaveTextContent(props.initialText) 
    expect(getByTestId("highlights")).toHaveTextContent(props.initialText)
    expect(props.onSelectedText).toHaveBeenCalledTimes(0)
    
    /* Action */
    fireEvent.touchEnd(getByTestId("text-area"), {target: { selectionStart, selectionEnd}})

    /* Postcondition */
    expect(props.onSelectedText).toHaveBeenCalledTimes(0)
  })
  
})
