import React from 'react';
import styles from './index.module.css';

const Error = ({text}) => {
    return(
        <div className={styles.container}>
            <h2><i>{text}</i></h2>
        </div>
    );
}

export default Error;