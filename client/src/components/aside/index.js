import React, { Component } from 'react';
import Title from '../title';
import Link from '../link';
import styles from './index.module.css';

const Aside = () => {

    return (
     <aside className={styles.Aside}>
       <Title title="Employee-book" />
       <Link href="/employees" title="All Employees" type="aside"/>
     </aside>
    );
}

export default Aside;
