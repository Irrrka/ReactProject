import React, { Component } from 'react';
import Link from '../link/index';
import styles from './index.module.css';

const Footer = () => {

  return (
    <footer className={styles.Footer}>
      <p className={styles.p}>Employee-Book Individual React Project for <span className={styles.university}>Software University 2020</span></p>
    </footer>
  );
}

export default Footer;
