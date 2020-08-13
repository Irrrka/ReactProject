import React, { Component } from 'react';
import Title from '../title';
import styles from './index.module.css';

const Aside = () => {

    return (
     <aside className={styles.Aside}>
       <Title title="Employee-book" />
     </aside>
    );
}

export default Aside;
