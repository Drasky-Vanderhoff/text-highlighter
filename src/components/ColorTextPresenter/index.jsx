import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const ColorTextPresenter = ({
  colorTextItemsLists
}) => (
  <blockquote className="color-text-presenter">
    {colorTextItemsLists.map(
        ({color, subtext}, idx) => <span key={idx}>
          <mark style={{backgroundColor: color}}>
            {subtext}
          </mark>
          <br/>
        </span>
    )}
  </blockquote>
)

export const ColorTextPresenterPropTypes = {
  colorTextItemsLists: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      subtext: PropTypes.string
    })
  )
}

ColorTextPresenter.propTypes = ColorTextPresenterPropTypes

ColorTextPresenter.defaultProps = {
  colorTextItemsLists: []
}

export default ColorTextPresenter