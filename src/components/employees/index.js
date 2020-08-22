import React, { Component } from 'react';
import Title from '../../components/title';
import styles from './index.module.css';
import Employee from '../employee';
import About from '../about';

class Employees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
    }

    getEmployees = async () => {
        const promise = await fetch('http://localhost:9999/api/employee');
        const response = await promise.json();
        this.setState({
          employees: response
        });
    }

    componentDidMount() {
        this.getEmployees();
    }

    renderEmployees() {
        const {
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


    render() {
        return (
            <div className={styles.container}>
                {this.renderEmployees()}
            </div>
        );
    }
}

export default Employees;