import React from 'react'
import App from './App'
import renderer from 'react-test-renderer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

const store = createStore(
  rootReducer
)

describe('App Component', () => {
  test('should render with default values', () => {
    expect(
      renderer.create(
        <Provider store={store}>
          <App />
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
