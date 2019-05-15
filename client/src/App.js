import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import Home from './components/Home'

import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'

const App = (props) => {
  return (
    <BrowserRouter>
      { props.user.auth &&
        <div className="app">
          <Navbar />
          <div className="wrapper">
            <Switch>
              <Route path="/" component={Home} exact={true} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </div>
      }
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps)(App)