import React, { Component } from 'react';
import Employee from '../../components/employee';
import Title from '../../components/title';
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import Error from '../../components/error';
import styles from './index.module.css';

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

    employees.sort((a, b) => b.likes.length - a.likes.length);
    employees = employees.slice(0, 3);

    if (employees.length === 0) {
      return (
        <Error text="Sorry, there aren't any employees at the moment" type="no-data" />
      );
    }

    return (
      <div>
        {employees.map(employee => {
          return (
            <Employee key={employee._id} page="home" {...employee} />
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
        <Title text="Most Nominated Employyes" />
        {this.renderEmployees()}
        <Title text="About" />
        <div className={styles['about-container']}>
          <div className={styles['about-text']}>
            Register your Company to our endorce system and nominate your collegue for a SPOT awards!
       </div>
        </div>
      </PageLayout>
    );
  }
}

export default HomePage;
