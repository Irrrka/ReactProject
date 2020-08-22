import React, { Component } from 'react';
import Container from '../../../components/container';
import Title from '../../../components/title';
import Input from '../../../components/input';
import Button from '../../../components/button';
import Error from '../../../components/error';
import styles from './index.module.css';
import UserContext from '../../../Context';
import getCookie from '../../../utils/cookie';
import validate from '../../../utils/validator';
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
                'Authorization': getCookie('x-auth-token')
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
            <Container>
                <form className={styles.container} onSubmit={this.onSubmit}>
                    <Title title="Add Employee to the Endorce system" />
                    <div className={styles.input}>
                        <Input
                            name="name"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => this.onChange(e, 'name')}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => this.onChange(e, 'email')}
                        />
                    </div>
                    <div className={styles.input}>
                        <Input
                            name="position"
                            value={position}
                            placeholder="Position"
                            onChange={(e) => this.onChange(e, 'position')}
                        />
                    </div>

                    {errors.map(error => (
                        <Error key={error} text={error} type="error" />
                    ))}

                    <div className={styles.submit}>
                        <Button text="Add" type="submit" />
                    </div>
                </form >
            </Container >
        );
    }
}

export default withRouter(AddEmployeePage);