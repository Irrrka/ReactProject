import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import Input from '../../components/input';
import Button from '../../components/button';
import Error from '../../components/error';
import styles from './index.module.css';
import UserContext from '../../Context';
import getCookie from '../../utils/cookie';
import validate from '../../utils/validator';
import { withRouter } from 'react-router-dom';

class AddEmployeePage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            position: '',
            errors: []
        }
    }

    onChange = (e, type) => {
        const newState = {};
        newState[type] = e.target.value;
        this.setState(newState);
    }

  
    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            email,
            position,
        } = this.state;

        const errors = validate(name, email, position);
        if (errors.length > 0) {
            this.setState({errors:  errors});
            return;
        }

        fetch('http://localhost:9999/api/employee', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                position
            }),
            headers: {
                'Content-Type': 'application/json',
                'Auth': getCookie('x-auth-token')
            }
        }).then(response => {
            if (response) {

            }
            return response.json();
        }).then(result => {
            this.props.history.push('/');

        })
    }

    render() {
        const {
            name,
            email,
            position,
            errors
        } = this.state;
        return (
            <PageLayout>
                <form className={styles['book-form']} onSubmit={this.onSubmit}>
                    <Title text="Add an Employee to our endorce system" />

                    <div className={styles['input-field']}>
                        <Input
                            name="name"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => this.onChange(e, 'name')}
                        />
                    </div>

                    <div className={styles['input-field']}>
                        <Input
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => this.onChange(e, 'email')}
                        />
                    </div>

                    {errors.map(error => (
                        <Error key={error} text={error} type="error" />
                    ))}

                    <div className={styles.submit}>
                        <Button text="Add" type="submit" />
                    </div>
                </form >
            </PageLayout >
        );
    }
}

export default withRouter(AddEmployeePage);