import React, { Component } from 'react';
import Employee from '../../components/employee';
import Title from '../../components/title';
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import Error from '../../components/error';
import styles from './index.module.css';

const About = () => {
 
    return (
      <PageLayout>
        <Title text="About" />
          <div className={styles.container}>
            <div className={styles.text}>
            Employee spot awards help increase employee engagement and motivation. Spot awards let you recognize employee accomplishments when they happen "on the spot" while making the accomplishment and award more relevant and "immediate" for the employee. Spot awards reinforce positive behavior and let employees know that efforts are noticed and appreciated. Impactful spot awards can be used for special recognition, "thank you", above & beyond effort, project completion, positive customer feedback, etc.
            </div>
          </div>
      </PageLayout>
    );
}

export default About;
