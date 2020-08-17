import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const LinkPath = ({ title, href , onClick}) => {
    return (
        <div className={styles['nav-item']}>
            <Link to={href} className={styles['nav-link']} onClick={onClick}>
                {title}
            </Link>
        </div>
    )
}

export default LinkPath;