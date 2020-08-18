import React, { Component } from 'react';
import Employee from '../../components/employee';
import Title from '../../components/title';
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import Error from '../../components/error';
import styles from './index.module.css';
import About from '../about';

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
    //employees = employees.slice(0, 3);

    // if (employees.length === 0) {
    //   return (
    //     <Error text="Sorry, there aren't any employees at the moment" type="no-data" />
    //   );
    // }

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
        <PageLayout>
          <Title text="Most Nominated Employyes" />
          {}
          <Title text="About" />
          <div className={styles.container}>
            <div className={styles.text}>
            Employee spot awards help increase employee engagement and motivation. Spot awards let you recognize employee accomplishments when they happen "on the spot" while making the accomplishment and award more relevant and "immediate" for the employee. Spot awards reinforce positive behavior and let employees know that efforts are noticed and appreciated. Impactful spot awards can be used for special recognition, "thank you", above & beyond effort, project completion, positive customer feedback, etc.
          </div>
          </div>
        </PageLayout>
      );
    }
  }
}

export default HomePage;
