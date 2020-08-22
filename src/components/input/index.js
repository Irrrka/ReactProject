import React from 'react';
import styles from './index.module.css';


const Input = ({ name, value, placeholder, onChange, type }) => {
    return (
        <div className={styles.container}>
            <input className={styles.input}
                type={type || 'text'} 
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;