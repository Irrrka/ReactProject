import React, { Component, useState } from 'react';
import Employee from '../../components/employee';
import Title from '../../components/title';
import PageLayout from '../../components/page-layout'
import UserContext from '../../Context'
import Error from '../../components/error';
import styles from './index.module.css';
import About from '../about';
import EmployeesPage from '../all-employees';

const HomePage = () => {
      return (
        <PageLayout>
          <About/>
          <EmployeesPage />
        </PageLayout>
      );
}

export default HomePage;
