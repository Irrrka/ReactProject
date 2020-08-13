import React, { Component } from 'react';
import Link from '../link/index';
import styles from './index.module.css';
import getNavigation from '../../utils/navigation';
import UserContext from '../../Context';

class Aside extends Component {

  static contextType = UserContext;

  render(){
    const {
      loggedIn,
      user
    } = this.context;
    const links = getNavigation(loggedIn, user);

    return (
     <aside className={styles.Aside}>
       {
  links.map(nav => {
    return (
      <Link key={nav.title} 
      href={nav.link} 
      title={nav.title} 
      type="aside"/>
  )
  })
  }
     </aside>
    );
}
}

export default Aside;
