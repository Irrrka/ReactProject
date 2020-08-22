import React, { Component } from 'react';
import Container from '../../../components/container';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Button from '../../../components/button';
import UserContext from '../../../Context';
import styles from './index.module.css';
import Error from '../../../components/error';
import { withRouter } from 'react-router-dom';


class RegisterPage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rePassword: '',
            errors: []
        }
    }

    validate() {
        const {
            username,
            password,
            rePassword
        } = this.state;

        const errors = [];

        if (username.length < 3) {
            errors.push('Company\'s name must be at least 3 characters long');
        }
        if (password.length < 3) {
            errors.push('Password must be at least 3 characters long');
        }
        if (password !== rePassword) {
            errors.push('Passwords don\'t match');
        }

        if (errors.length > 0) {
            this.setState({ errors });
            return true;
        }

        return false;
    }

    onChange(e, type) {
        const newState = {};
        newState[type] = e.target.value;
        this.setState(newState);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            username,
            password
        } = this.state;

        const hasErrors = this.validate();

        if (hasErrors) {
            return;
        }

        fetch('http://localhost:9999/api/user/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const token = response.headers.get('auth');
            if (token) {
                document.cookie = `x-auth-token=${token}`;
            }
            return response.json();
        }).then(result => {

            if (result.error) {
                this.setState({
                    errors: [result.error]
                });
                return
            }

            if (result.username) {
                const user = {
                    _id: result._id,
                    username: result.username,
                    employees: result.employees,
                };
                this.context.login(user);
                this.context.user = user;
                this.context.id = user._id;
                this.props.history.push('/');
            }
        })
    }

    render() {
        const {
            username,
            password,
            rePassword,
            errors
        } = this.state;

        return (
            <Container>
                <form className={styles.container} onSubmit={this.onSubmit}>
                    <Title title="Register your Company to the Endorce system" />
                    <div className={styles.input}>
                        <Input
                            name="username"
                            value={username}
                            placeholder="Company name"
                            onChange={(e) => this.onChange(e, 'username')}
                        />
                    </div>

                    <div className={styles.input}>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => this.onChange(e, 'password')}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            type="password"
                            name="rePassword"
                            value={rePassword}
                            placeholder="Confirm Password"
                            onChange={(e) => this.onChange(e, 'rePassword')}
                            className={styles.input}
                        />
                    </div>
                    {errors.map(error => (
                        <Error key={error} text={error} type="error" />
                    ))}
                    <div className={styles.submit}>
                        <Button text="Register" type="submit" />
                    </div>
                </form>
            </Container>
        );
    }
}

export default withRouter(RegisterPage);