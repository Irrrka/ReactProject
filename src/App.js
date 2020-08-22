import React, { Component } from 'react';
import UserContext from './Context';
import getCookie from './utils/cookie';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: false,
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
//console.log("token"+token);
        if (!token) {
            this.logout();
            return;
        }

        fetch('http://localhost:9999/api/user/verify', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(promise => {
            return promise.json();
            console.log(promise)
        }).then(response => {
            if (response.status) {
                const user = {
                    _id: response.user._id,
                    username: response.user.username,
                    employees: response.user.employees,
                };
                console.log("user"+user)
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

export default App;