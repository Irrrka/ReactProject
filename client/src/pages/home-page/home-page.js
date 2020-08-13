import React from 'react';
import styles from './home-page.module.css';

import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import Employees from '../../components/employees';
import UserContext from '../../Context';

const Employees = () => {

   // <div class="text-center text-muted font-weight-light text-large">Loading projects!</div>

    //static contextType = UserContext;
    return (
    <PageLayout>
      <Title title="Employees" />
      <Employees />
   </PageLayout>
);
}


export default HomePage;
