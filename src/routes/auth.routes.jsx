import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
