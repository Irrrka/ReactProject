import React from 'react';
import styles from './index.module.css';

const Textarea = ({ label, id, value, onChange, placeholder }) => {
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={id}>
                {label}:
            </label>
            <textarea className={styles.input} id={id} value={value} onChange={onChange} placeholder={placeholder} className={styles.textarea}/>
        </div>
    )
}

export default Textarea;