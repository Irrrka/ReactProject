import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

const LinkComponent = ({title, href, type}) => {
  return (

    <div className={styles.li}>
      <Link to={href} className={styles.a}>
          {title}
      </Link>
    </div>

        //  <li className={styles[`${type}-list-item`]}>
        //      <Link to={href} className={styles[`${type}-link`]} href={href}>{title}</Link>
        //  </li>
  );
}

export default LinkComponent;
