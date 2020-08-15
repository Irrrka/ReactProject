import React, { Component } from 'react';
import Nav from '../link';
import styles from './index.module.css';
import logo from '../../images/spot.jpg';
import getNavigation from '../../utils/navigation';
import UserContext from '../../Context';


class Header extends Component {

  static contextType = UserContext;

  render(){
    const {
      loggedIn,
      user
    } = this.context;
    const links = getNavigation(loggedIn, user);

  return (
    <header className={styles.navigation}>
    <img alt="logo" className={styles.logo} src={logo} />
    {
      links.map(navElement => {
        return (
          <Nav
            key={navElement.title}
            href={navElement.link}
            title={navElement.title}
            type="header"
          />
        )
      })
    }
  </header>
  );
}
}

export default Header;
