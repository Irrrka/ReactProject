import React, { Component } from 'react';
import styles from './index.module.css';
import logo from '../../images/logo.svg';

const Employee = ({position, user}) => {
return (
        <div className={styles.Post}>
            <img className={styles.img} src={logo} />
            <p className={styles.description}>
                <span>{index} - </span>
           {position} - 
           </p>
        <span className={styles.user}>{user.username}</span>
        </div>
    );
}

export default Employee;
