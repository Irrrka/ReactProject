import React, { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/home';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import AddEmployeePage from './pages/add-employee';
import EmployeeDetailsPage from './pages/details-employee';
import EditEmployeePage from './pages/edit-employee';
import Employees from './components/employees';
import UserContext from './Context';

const Navigation = () => {
    const context = useContext(UserContext);
    const loggedIn = context.user && context.logged;
    console.log("context" + context.user)
    return (
        <Switch>
           <Route path="/" exact component={HomePage} />
            {/* <Route path="/all" component={Employees} /> */}
            <Route path="/details/:id" component={EmployeeDetailsPage} />
            <Route path="/register">
                {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
            </Route>
            <Route path="/login">
                {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
            </Route>
            <Route path="/profile/:id" >
                {loggedIn ? (<ProfilePage />) : (<Redirect to="/login" />)}
            </Route>
            <Route path="/create">
                {loggedIn ? (<AddEmployeePage />) : (<Redirect to="/login" />)}
            </Route>
            <Route path="/edit/:id">
                {loggedIn ? (<EditEmployeePage />) : (<Redirect to="/login" />)}
            </Route>
            <Route path="*" component={HomePage} />
        </Switch>
    );
}

export default Navigation;