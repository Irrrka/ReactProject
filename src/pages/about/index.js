import React from 'react';
import Title from '../../components/title';
import PageLayout from '../../components/page-layout'
import styles from './index.module.css';

const About = () => {
 
    return (
      <div>
        <Title title="About this site" />
          <div className={styles.container}>
            <div className={styles.text}>
            <i>Employee spot awards help increase employee engagement and motivation. Spot awards let you recognize employee accomplishments when they happen "on the spot" while making the accomplishment and award more relevant and "immediate" for the employee. Spot awards reinforce positive behavior and let employees know that efforts are noticed and appreciated. Impactful spot awards can be used for special recognition, "thank you", above & beyond effort, project completion, positive customer feedback, etc.
            </i></div>
          </div>
      </div>
    );
}

export default About;
