import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InteractiveColorRow from './'
import renderer from 'react-test-renderer'

describe('InteractiveColorRow Component', () => {
  test('should render with default values', () => {
    expect(
      renderer.create(<InteractiveColorRow />).toJSON()
    ).toMatchSnapshot()
  })

  test('should render with color boxes and description text', () => {
    const props = {
      colorBoxes: [
        {
          background: 'red',
          highlight: 'yellow',
          isHighlighted: true
        },
        {
          background: 'blue',
          highlight: 'yellow',
          isHighlighted: false
        },
        {
          background: 'green',
          highlight: 'yellow',
          isHighlighted: false
        },
      ],
      descriptionText: "This is a really bad description text... yep"
    }
    expect(
      renderer.create(<InteractiveColorRow {...props}/>).toJSON()
    ).toMatchSnapshot()
  })

  test(`
    should call selected color box callback, 
    highlight the selected color box and 
    unhighlight the previous one when multiple selections is disable
  `, () => {
    const props = {
      colorBoxes: [
        {
          background: 'red',
          highlight: 'yellow',
          isHighlighted: true
        },
        {
          background: 'blue',
          highlight: 'yellow',
          isHighlighted: false
        },
        {
          background: 'green',
          highlight: 'yellow',
          isHighlighted: false
        },
      ],
      onSelectedColorRow: jest.fn(),
      descriptionText: "This is a really bad description text... yep",
      multipleSelections: false
    }
    const {getByTestId} = render(<InteractiveColorRow {...props} />)
    /* Precondition */
    expect(getByTestId(`color-box-${props.colorBoxes[0].background}`).getAttribute('class')).toEqual('color-box highlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[1].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[2].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(props.onSelectedColorRow).toHaveBeenCalledTimes(1)
    expect(props.onSelectedColorRow).toHaveBeenCalledWith([props.colorBoxes[0].background])

    /* Action */
    fireEvent.click(getByTestId(`color-box-row-${1}`))

    /* Postcondition */
    expect(getByTestId(`color-box-${props.colorBoxes[0].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[1].background}`).getAttribute('class')).toEqual('color-box highlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[2].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(props.onSelectedColorRow).toHaveBeenCalledTimes(2)
    expect(props.onSelectedColorRow).toHaveBeenCalledWith([props.colorBoxes[1].background])
  })

  test(`
    should call selected color box callback, 
    highlight the selected color box and 
    keep highlighted the previous one when multiple selections is enable
  `, () => {
    const props = {
      colorBoxes: [
        {
          background: 'red',
          highlight: 'yellow',
          isHighlighted: true
        },
        {
          background: 'blue',
          highlight: 'yellow',
          isHighlighted: false
        },
        {
          background: 'green',
          highlight: 'yellow',
          isHighlighted: false
        },
      ],
      onSelectedColorRow: jest.fn(),
      descriptionText: "This is a really bad description text... yep",
      multipleSelections: true
    }
    const {getByTestId} = render(<InteractiveColorRow {...props} />)
    /* Precondition */
    expect(getByTestId(`color-box-${props.colorBoxes[0].background}`).getAttribute('class')).toEqual('color-box highlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[1].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[2].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(props.onSelectedColorRow).toHaveBeenCalledTimes(1)
    expect(props.onSelectedColorRow).toHaveBeenCalledWith([props.colorBoxes[0].background])

    /* Action */
    fireEvent.click(getByTestId(`color-box-row-${1}`))

    /* Postcondition */
    expect(getByTestId(`color-box-${props.colorBoxes[0].background}`).getAttribute('class')).toEqual('color-box highlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[1].background}`).getAttribute('class')).toEqual('color-box highlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[2].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(props.onSelectedColorRow).toHaveBeenCalledTimes(2)
    expect(props.onSelectedColorRow).toHaveBeenCalledWith([
      props.colorBoxes[0].background, 
      props.colorBoxes[1].background
    ])
  })

  test(`
    should call selected color box callback and
    unhighlight the previous selected color box when multiple selections is enable
  `, () => {
    const props = {
      colorBoxes: [
        {
          background: 'red',
          highlight: 'yellow',
          isHighlighted: true
        },
        {
          background: 'blue',
          highlight: 'yellow',
          isHighlighted: false
        },
        {
          background: 'green',
          highlight: 'yellow',
          isHighlighted: false
        },
      ],
      onSelectedColorRow: jest.fn(),
      descriptionText: "This is a really bad description text... yep",
      multipleSelections: true
    }
    const {getByTestId} = render(<InteractiveColorRow {...props} />)
    /* Precondition */
    expect(getByTestId(`color-box-${props.colorBoxes[0].background}`).getAttribute('class')).toEqual('color-box highlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[1].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[2].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(props.onSelectedColorRow).toHaveBeenCalledTimes(1)
    expect(props.onSelectedColorRow).toHaveBeenCalledWith([props.colorBoxes[0].background])

    /* Action */
    fireEvent.click(getByTestId(`color-box-row-${0}`))

    /* Postcondition */
    expect(getByTestId(`color-box-${props.colorBoxes[0].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[1].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(getByTestId(`color-box-${props.colorBoxes[2].background}`).getAttribute('class')).toEqual('color-box unhighlighted')
    expect(props.onSelectedColorRow).toHaveBeenCalledTimes(2)
    expect(props.onSelectedColorRow).toHaveBeenCalledWith([
    ])
  })
  
})
