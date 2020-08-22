import React, { Component } from 'react'
import Link from '../link'
import styles from './index.module.css'
import logo from '../../images/logo.jpg'
import getLinks from '../../utils/navigation'
import UserContext from '../../Context';
import Button from '../button';

class Header extends Component {

  constructor(props){
    super(props)
  }
  static contextType = UserContext;

  render() {
    const {
      logged, 
      user
    } = this.context;

    const links = getLinks(logged,user);
  
    return (
      <div>
      <header className={styles.navigation}>
        <img alt="logo" className={styles.logo} src={logo} />
        {
          links.map(link => {
            return (
              <Link
                key={link.title}
                href={link.href}
                title={link.title}
              />
            )
          })
        }
      </header>
      </div>
    )
  }
}

export default Header