import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageTitle from '../../components/title';
import styles from './index.module.css';
import AlertMsg from '../../components/error';
import Title from '../../components/title';
import Employee from '../employee';

class Employees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
    }

    getEmployees = async () => {
        const response = await fetch('http://localhost:9999/api/employee');
        const employees = await response.json();
        this.setState({
          employees
        });
    }

    renderEmployees() {
        let {
            employees
        } = this.state;

        employees.sort((a, b) => b.likes.length - a.likes.length);

        return (
            <div className={styles.container}>
                {employees.map(employee => {
                    return (
                        <Employee key={employee._id} {...employee} />
                    );
                })}
            </div>
        );
    }

    componentDidMount() {
        this.getEmployees();
    }

    render() {
        let {
            employees
        } = this.state;

        return (
            <PageLayout>
                <Title title="All Employees" />
                {this.renderEmployees()}
            </PageLayout>
        );
    }
}

export default Employees;