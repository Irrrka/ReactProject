import React, { Component } from 'react';
import UserContext from './Context';
import getCookie from './utils/cookie';


class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: null,
            user: null
        };
    }

    login = (user) => {
        this.setState({
            logged: true,
            user
        });
    }

    logout = () => {
        document.cookie = 'x-auth-token= ;  expires = Thu, 01 Jan 1970 00:00:00 GMT';
        this.setState({
            logged: false,
            user: null
        });
    }

    componentDidMount() {
        const token = getCookie('x-auth-token');

        if (!token) {
            this.logout();
            return;
        }

        fetch('http://localhost:9999/api/user/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth': token
            }
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.status) {
                const user = {
                    _id: result.user._id,
                    username: result.user.username,
                    employees: result.user.employees,
                };
                this.login(user);
            } else {
                this.logout();
            }
        })
    }

    render() {
        const {
            logged,
            user
        } = this.state;

        return (
            <UserContext.Provider value={{
                logged,
                user,
                login: this.login,
                logout: this.logout
            }}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default Auth;