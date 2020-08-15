import React from 'react';
import Header from '../header';
import styles from './index.module.css';
import Aside from '../aside';
import Footer from '../footer';

const Container = (props) => {
  return (
    <div className={styles.App}>
    <Header />
    {/* <div className={styles.Container}>
      <Aside /> */}
      <div className={styles.InnerContainer}>
        {props.children}
      </div>
    {/* </div> */}
    <Footer />
  </div>
  );
}

export default Container;
