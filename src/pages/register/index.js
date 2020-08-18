import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import Input from '../../components/input';
import Button from '../../components/button';
import UserContext from '../../Context';
import styles from './index.module.css';
import Error from '../../components/error';
import { withRouter } from 'react-router-dom';


class RegisterPage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            errors: []
        }
    }

    validate() {
        const {
            username,
            password,
            confirmPassword
        } = this.state;

        const errors = [];

        if (username.length < 3) {
            errors.push('Username must be atleast 3 charecters');
        }
        if (password.length < 6) {
            errors.push('Password must be atleast 6 characters');
        }
        if (password !== confirmPassword) {
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
                this.props.history.push('/');
            }
        })
    }

    render() {
        const {
            username,
            password,
            confirmPassword,
            errors
        } = this.state;

        return (
            <PageLayout>
                <form className={styles.container} onSubmit={this.onSubmit}>
                    <Title text="Register your Company" />
                    <div className={styles['input-field']}>
                        <Input
                            name="username"
                            value={username}
                            placeholder="Company name"
                            onChange={(e) => this.onChange(e, 'username')}
                        />
                    </div>

                    <div className={styles['input-field']}>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => this.onChange(e, 'password')}
                            className={styles['input-field']}
                        />
                    </div>
                    <div className={styles['input-field']}>
                        <Input
                            type="password"
                            name="rePassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => this.onChange(e, 'confirmPassword')}
                            className={styles['input-field']}
                        />
                    </div>
                    {errors.map(error => (
                        <Error key={error} text={error} type="error" />
                    ))}
                    <div className={styles.submit}>
                        <Button text="Sign Up" type="submit" />
                    </div>
                </form>
            </PageLayout>
        );
    }

}

export default withRouter(RegisterPage);