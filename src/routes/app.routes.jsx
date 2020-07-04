import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Inbox from '../pages/Inbox/Inbox'
import Chat from '../pages/Chat/Chat'

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Inbox} />
        <Route path="/chat/:id" component={Chat} />
        <Route path="/login">
          <Redirect exact to="/" />
        </Route>
        <Route path="/register">
          <Redirect exact to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
