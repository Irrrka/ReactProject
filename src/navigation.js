import React, { useContext } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import HomePage from './pages/home'
import Nominate from './pages/nominate'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import ProfilePage from './pages/profile'
import ErrorPage from './pages/error'
import UserContext from './Context'
import CreateEmployeePage from './pages/create-employee'

const Navigation = () => {
  const context = useContext(UserContext)
  const loggedIn = context.user && context.user.loggedIn

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/nominate"> 
        {loggedIn ? (<Nominate />): (<Redirect to="/login" />)}
      </Route>
      <Route path="/create"> 
        {loggedIn ? (<CreateEmployeePage />): (<Redirect to="/login" />)}
      </Route>
      <Route path="/register">
        {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
      </Route>
      <Route path="/login">
        {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
      </Route>
      <Route path="/profile/:userid">
        {loggedIn ? (<ProfilePage />): (<Redirect to="/login" />)}
      </Route>
      <Route component={ErrorPage} />
    </Switch>
  )
}

export default Navigation