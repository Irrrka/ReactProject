import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import UserContext from '../../Context';
import Employee from '../../components/employee';
import styles from './index.module.css';
import Error from '../../components/error';
import { withRouter } from 'react-router-dom';


class ProfilePage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            employees: []
        }
    }

    getUser = async () => {
        const id = this.props.match.params.id;
        const response = await fetch(`http://localhost:9999/api/user?id=${id}`);
        const user = await response.json();
        this.setState({
            ...user
        });
    }

    renderEmployees = () => {
        const {
            username,
            employees
        } = this.state;

        return (
            <div>
                <h3>All Employees of your Company:</h3>
                <div className={styles.container}>
                    {this.state.employees.map(employee => {
                        return (
                            <Employee key={employee._id} {...employee} />
                        );
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getUser();
    }

    render() {
        const {
            username,
            employees
        } = this.state;

        const lenght = employees.length;
        const likes = employees.map(employees => employees.likes.length).reduce((a, b) => a + b, 0);

        return (
            <PageLayout>
                <Title text="Profile" />
                <div className={styles.card}>
                <h1>{username}</h1>
                    <p className={styles.title}>Your Company has already: {lenght} employees.</p>
                    <p className={styles.title}>Nomination statistics: {likes}</p>
                </div>
                {this.renderEmployees()}

            </PageLayout >
        )
    }
}

export default withRouter(ProfilePage);