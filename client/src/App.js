import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './components/Home'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

export default App