import React     from 'react'
import { Route } from 'react-router-dom'
import Home      from './containers/home'
import Keys      from './containers/keys'
import Encrypt   from './containers/encrypt'
import Decrypt   from './containers/decrypt'

const RouteFunctor = [
  { path: '/', component: Home, exact: true },
  { path: '/keys', component: Keys },
  { path: '/decrypt', component: Decrypt },
  { path: '/encrypt', component: Encrypt },
]

const RouteActor = route => {
  return(
    <Route
      exact={route.exact}
      path={route.path}
      render={ props =>
          <route.component {...props} routes={route.sub_routes} />
      }
    />
  )
}

export {
  RouteActor,
  RouteFunctor,
}
