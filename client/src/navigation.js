import React from 'react';
import { useContext } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import UserContext from './Context';
import HomePgae from './pages/home-page';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import ErrorPage from './pages/error';
import NominatePage from './pages/nominate';
import EmployeePage from './pages/employee';

const Navigation = () => {

    const context = useContext(UserContext)
    const loggedIn = context.user && context.user.loggedIn


    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePgae} />
            <Route path="/nominate"> 
                {loggedIn ? (<NominatePage />): (<Redirect to="/login" />)}
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
            <Route path="/employee/:userid">
                {loggedIn ? (<EmployeePage />): (<Redirect to="/login" />)}
            </Route>
            <Route component={ErrorPage} />
        </Switch>
        </BrowserRouter>
    )
}

export default Navigation;