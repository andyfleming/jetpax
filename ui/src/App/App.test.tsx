import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import makeStore from "./Store/makeStore"
import getDefaultDependencies from "./Dependencies/getDefaultDependencies"
import {Provider} from "react-redux"
import {MemoryRouter} from "react-router"

it('renders without crashing', () => {
  const div = document.createElement('div')
  const deps = getDefaultDependencies()
  const store = makeStore(deps)
  ReactDOM.render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>, div)
  ReactDOM.unmountComponentAtNode(div)
})
