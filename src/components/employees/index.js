import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageTitle from '../../components/title';
import styles from './index.module.css';
import Error from '../../components/error';
import Title from '../../components/title';
import Employee from '../employee';
import About from '../../pages/about';

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

        employees.sort((a, b) => b.nominations.length - a.nominations.length);

        if (!employees) {
            return (
                <About />
            )
        } else {
            
            return (
               <div>
                    <Title title="All Employees" />
                    {employees.map(employee => {
                        return (
                            <Employee key={employee._id} {...employee} />
                        );
                    })}
                </div>
            );
        }
    }

    componentDidMount() {
        this.getEmployees();
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderEmployees()}
            </div>
        );
    }
}

export default Employees;