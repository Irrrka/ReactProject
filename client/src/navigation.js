import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import HomePgae from './pages/home-page';
import Vote from './pages/vote';
import RegisterPage from './pages/register';

const Navigation = () => {

    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={HomePgae}/>
            <Route path="/share" component={Vote}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/profile/:userId" component={ProfilePage}/>
            <Route component={ErrorPage}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Navigation;