import React, { Component } from 'react';
import Employee from '../../components/employee';
import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import styles from './index.module.css';
import Error from '../../components/error';

class EmployeesPage extends Component {
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

        if (employees.length === 0) {
            return (
                <Error text="Sorry, there aren't any posted employees at the moment" type="no-data"/>
            );
        }

        return (
            <div className={styles[`book-container`]}>
                {employees.map(employee => {
                    return (
                        <Employee key={employee._id} page="all" {...employee} />
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
            <PageLayout footer={footerType}>
                <Title text="All Posted employees" />
                {this.renderEmployees()}
            </PageLayout>
        );
    }
}

export default EmployeesPage;