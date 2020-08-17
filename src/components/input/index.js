import React from 'react';
import styles from './index.module.css';


const Input = ({ name, value, placeholder, onChange, type }) => {
    return (
        <div className={styles['input-container']}>
            <input className={styles['input-field']}
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