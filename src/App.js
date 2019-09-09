import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearSelections, saveSelectedText } from 'actions'
import InteractiveColorRow from 'components/InteractiveColorRow'
import ColorTextPresenter from 'components/ColorTextPresenter'
import TextHighlightableArea from 'components/TextHighlightableArea'
import config from './config.json'
import './App.scss'

class App extends Component {  
  constructor(props) {
    super(props)
    // Finds a color that is highlighted in the configurations and set that one as the active one
    const highlightedColor = config.availableColorPairs.find(
      ({isHighlighted}) => isHighlighted
    ).background || ""

    this.state = {
      currentText: config.text,
      selectionColor: highlightedColor,
      filterColor: [highlightedColor]
    }
  }

  /* Callbacks */
  saveSelectedText = (selectionStart, selectionEnd) => this.props.saveSelectedText(
    this.state.selectionColor,
    selectionStart,
    selectionEnd,
    this.state.currentText
  )
  setSelectionColor = ([selectionColor]) => this.setState({selectionColor})
  setFilterColor = (filterColor) => this.setState({filterColor})
  setCurrentText = (currentText) => {
    this.props.clearSelections()
    this.setState({currentText})
  }

  /* Renders */
  renderNoColorsAvailable = () => <div>
    No colors were defined in the configuration, please define colors in order be able to use the app.
  </div>

  render() {
    const filteredSelections = this.props.higlightedTextItems.filter(
      ({color}) => this.state.filterColor.includes(color)
    )
    return (
      <div className="app">
        <button
          data-testid="clear-button" 
          className="clear-button"
          onClick={this.props.clearSelections}
        >
          Clear Selections
        </button>
        {config.availableColorPairs.length ? 
          <InteractiveColorRow
          key="selection_color_row" 
            colorBoxes={config.availableColorPairs} 
            onSelectedColorRow={this.setSelectionColor}
            descriptionText={config.selectorDescriptionText}
            multipleSelections={false}
          /> : 
          this.renderNoColorsAvailable()
        }
        <TextHighlightableArea
          initialText={this.state.currentText}
          onSelectedText={this.saveSelectedText}
          onChangeText={this.setCurrentText}
          highlightMarkers={this.props.higlightedTextItems}
        />
        <InteractiveColorRow
          key="filter_color_row" 
          colorBoxes={config.availableColorPairs} 
          onSelectedColorRow={this.setFilterColor} 
          descriptionText={config.filterDescriptionText}
          multipleSelections={true}
        />
        <ColorTextPresenter colorTextItemsLists={filteredSelections} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  higlightedTextItems: state.higlightedTextItems
})

const mapDispatchToProps = dispatch => ({
  saveSelectedText: (
    ...params
  ) => dispatch(saveSelectedText(
    ...params
  )),
  clearSelections: () => dispatch(clearSelections())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
