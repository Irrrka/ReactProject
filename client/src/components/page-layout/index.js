import React from 'react';
import Header from '../header';
import styles from './index.module.css';
import Aside from '../aside';
import Footer from '../footer';

const PageLayout = (props) => {
  return (
    <div className={styles.App}>
     <Header />
     <div className={styles.Container}>
       <Aside />
       <div className={styles.innerContainer}>
       {props.children}
       </div>
     </div>
     <Footer />
    </div>
  );
}

export default PageLayout;
