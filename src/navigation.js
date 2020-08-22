import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import HomePage from './pages/home';
import RegisterPage from './pages/user/register';
import LoginPage from './pages/user/login';
import ProfilePage from './pages/user/profile';
import AddEmployeePage from './pages/employee/add';
import EmployeeDetailsPage from './pages/employee/details/indexxx';
import EditEmployeePage from './pages/employee/edit';
import NominateEmployeePage from './pages/employee/nominate';
import UserContext from './Context';
import ErrorPage from './pages/error';

const Navigation = () => {
    const context = useContext(UserContext);
    const loggedIn = context.user && context.logged;

    return (
        <BrowserRouter>
        <Switch>
           <Route path="/" exact component={HomePage} />
            <Route path="/register">
                {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
            </Route>
            <Route path="/login">
                {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
            </Route>
            <Route path="/profile/:_id" >
                {loggedIn ? (<ProfilePage />) : (<Redirect to="/login" />)}
            </Route>
            <Route path="/create">
                {loggedIn ? (<AddEmployeePage />) : (<Redirect to="/login" />)}
            </Route>
            <Route path="/details/:id" component={EmployeeDetailsPage} />
            <Route path="/edit/:id">
                {loggedIn ? (<EditEmployeePage />) : (<Redirect to="/login" />)}
            </Route>
            <Route path="/nominate/:id">
                {loggedIn ? (<NominateEmployeePage />) : (<Redirect to="/login" />)}
            </Route>
            <Route path="*" component={ErrorPage} />
        </Switch>
        </BrowserRouter>
    );
}

export default Navigation;