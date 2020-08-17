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
        if (this.state.employees.length === 0) {
            return (
                <Error text="There aren't any employees by you. You can do post now :)" type="no-data"/>
            );
        }
        
        return (
            <div>
                <h2>All Employees Listed by You</h2>
                <div className={styles[`book-container`]}>
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
        const likes = employees.map(empl => empl.likes.length).reduce((a, b) => a + b, 0);

        return (
            <PageLayout>
                <Title text="Profile" />
                <div className={styles.card}>
                <h1>{username}</h1>
                    <p className={styles.title}>Employees Posted: {lenght}</p>
                    <p className={styles.title}>Likes Aquired: {likes}</p>
                </div>
                {this.renderEmployees()}

            </PageLayout >
        )
    }
}

export default withRouter(ProfilePage);