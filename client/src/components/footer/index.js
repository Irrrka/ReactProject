import React, { Component } from 'react';
import Link from '../link/index';
import styles from './index.module.css';

class Footer extends Component {

  static contextType = UserContext;

  render(){
    const {
      loggedIn,
      user
    } = this.context;

    const links = getNavigation(loggedIn, user);

  return (
    <footer className={styles.Footer}>
     <ul>
     <Link key={nav.title} 
    href={nav.link} 
    title={nav.title} 
    type="footer"/>
     </ul>
     <p className={styles.paragraph}>SoftUni 2020</p>
    </footer>
  );
}
}

export default Footer;
