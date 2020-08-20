import React, { Component } from 'react';
import Employees from '../../components/employees';
import Employee from '../../components/employee';
import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import styles from './index.module.css';
import Error from '../../components/error';

const EmployeesPage = () => {

    return (
        <Employees />
    );
}

export default EmployeesPage;