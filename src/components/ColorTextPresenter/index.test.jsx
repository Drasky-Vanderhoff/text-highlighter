import React from 'react'
import ColorTextPresenter from './'
import renderer from 'react-test-renderer'

describe('ColorTextPresenter Component', () => {
  test('should render with default values', () => {
    expect(
      renderer.create(<ColorTextPresenter />).toJSON()
    ).toMatchSnapshot()
  })

  test('should render the color text items in the list', () => {
    const props = {
      colorTextItemsLists: [
        {
          color: "red",
          subtext: "lorem"
        },
        {
          color: "blue",
          subtext: "ip"
        },
        {
          color: "blue",
          subtext: "sum"
        },
        {
          color: "yellow",
          subtext: "more text just because"
        }
      ]
    }
    expect(
      renderer.create(<ColorTextPresenter {...props}/>).toJSON()
    ).toMatchSnapshot()
  })
})
