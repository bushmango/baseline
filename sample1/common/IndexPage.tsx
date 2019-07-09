import React from 'react'
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom'

import _ from 'lodash'

export const Routes = (props: { routes: any; NoMatch: any }) => {
  return (
    <Switch>
      {_.map(props.routes, (c) => (
        <Route key={c.path} exact path={c.path} component={c.component} />
      ))}
      <Route component={props.NoMatch} />
    </Switch>
  )
}
export const IndexPage = (props: {
  originalUrl: string
  isServer: boolean
  routes: any
  NoMatch: any
}) => {
  return (
    <div>
      <h1>Index page - {props.originalUrl}</h1>
      {!props.isServer ? (
        <BrowserRouter>
          <Routes routes={props.routes} NoMatch={props.NoMatch} />
        </BrowserRouter>
      ) : (
        <StaticRouter location={props.originalUrl}>
          <Routes routes={props.routes} NoMatch={props.NoMatch} />
        </StaticRouter>
      )}
      <div style={{ display: 'none' }}>
        {props.originalUrl} - Rendered on {props.isServer ? 'server' : 'client'}
      </div>
    </div>
  )
}
