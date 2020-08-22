import React from 'react';
import styles from './index.module.css';

const Button = ({ text, onClick, disabled }) => {
    if (disabled) {
        return (
            <button onClick={onClick} className={styles.btn} disabled>{text}</button>
        );
    }else{
        return (
            <button onClick={onClick} className={styles.btn}>{text}</button>
        );
    }
}

export default Button;