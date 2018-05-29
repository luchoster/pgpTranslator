import React, { Component } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { RouteFunctor, RouteActor } from './routes'
import Header from './components/header'
import { Keys } from './actions'

class App extends Component {
  componentDidMount() {
    this.props.getSavedKeys()
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header generateKeys={options => this.props.generateKeys(options)} />
          <div className="container">
            <Switch>
              {RouteFunctor.map((route, key) => (
                <RouteActor key={key} {...route} />
              ))}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  keys: state.keys,
})

const mapDispatchToProps = dispatch => ({
  getSavedKeys: () => dispatch(Keys.savedKeys()),
  generateKeys: options => dispatch(Keys.keyGen(options)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
