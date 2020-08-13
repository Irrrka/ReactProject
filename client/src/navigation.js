import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import HomePgae from './pages/home-page';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import ErrorPage from './pages/error';
import NominatePage from './pages/nominate';
import EmployeePage from './pages/employee';

const Navigation = () => {

    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePgae}/>
            <Route path="/nominate" component={NominatePage}/>
            <Route path="/employee/:userid" component={EmployeePage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/profile/:userId" component={ProfilePage}/>
            <Route component={ErrorPage}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Navigation;