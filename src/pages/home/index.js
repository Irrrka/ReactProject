import React, { Component } from 'react';
import Employee from '../../components/employee';
import Title from '../../components/title';
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import Error from '../../components/error';
import styles from './index.module.css';
import About from '../about';
import EmployeesPage from '../all-employees';

class HomePage extends Component {
  static contextType = UserContext;
  
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

    //employees.sort((a, b) => b.likes.length - a.likes.length);

    return (
      <div>
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

    if (!this.renderEmployees()) {
      return <About/>
    } else {
      return (
          <EmployeesPage />
      );
    }
  }
}

export default HomePage;
