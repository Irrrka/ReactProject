import React, { Component } from 'react'
import Link from '../link'
import styles from './index.module.css'
import logo from '../../images/logo.jpg'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'


class Header extends Component {

  static contextType = UserContext

  render() {
    const {
      user
    } = this.context
    
    const links = getNavigation(user)

    return (
      <header className={styles.navigation}>
        <img alt="logo" className={styles.logo} src={logo} />
        {
          links.map(navElement => {
            console.log(navElement.link)
            return (
              <Link
                key={navElement.title}
                href={navElement.href}
                title={navElement.title}
              />
            )
          })
        }
      </header>
    )
  }
}

export default Header