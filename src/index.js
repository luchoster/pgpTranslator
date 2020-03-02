import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles/'
import App from './app'
import Reducers from './reducers/'
import registerServiceWorker from './registerServiceWorker'

import './styles/index.css'

const store = createStore(Reducers, applyMiddleware(Thunk))

const theme = createMuiTheme({
  palette: 'dark',
})

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
