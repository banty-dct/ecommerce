import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import Home from './components/Home'

import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'

import AdminProductViewAll from "./components/admin/products/ViewAll"
import AdminProductViewOne from "./components/admin/products/ViewOne"
import AdminProductAdd from "./components/admin/products/Add"
import AdminProductEdit from "./components/admin/products/Edit"

import AdminCategoryViewAll from "./components/admin/categories/ViewAll"
import AdminCategoryAdd from "./components/admin/categories/Add"
import AdminCategoryEdit from "./components/admin/categories/Edit"

import { Spinner } from "./components/commons/Spinner"

const App = (props) => {
  return (
    <BrowserRouter>
      { props.user.auth ?
        <div className="app">
          <Navbar />
          <div className="wrapper">
            <Switch>

              <Route path="/" component={Home} exact={true} />

              <Route path="/login" component={Login} exact={true} />
              <Route path="/logout" component={Logout} exact={true} />
              <Route path="/register" component={Register} exact={true} />

              <Route path="/admin/products" component={AdminProductViewAll} exact={true} />
              <Route path="/admin/products/add" component={AdminProductAdd} exact={true} />
              <Route path="/admin/products/view/:id" component={AdminProductViewOne} exact={true} />
              <Route path="/admin/products/edit/:id" component={AdminProductEdit} exact={true} />

              <Route path="/admin/categories" component={AdminCategoryViewAll} exact={true} />
              <Route path="/admin/categories/add" component={AdminCategoryAdd} exact={true} />
              <Route path="/admin/categories/edit/:id" component={AdminCategoryEdit} exact={true} />

            </Switch>
          </div>
        </div> : <div className="text-center mt-5 mb-5"><Spinner /></div>
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