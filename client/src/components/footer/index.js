import React, { Component } from 'react'
import Nav from '../link'
import styles from './index.module.css'
import getNavigation from '../../utils/navigation'
import UserContext from '../../Context'

class Footer extends Component {
  
  static contextType = UserContext

  render() {
    const {
      user
    } = this.context
    
    const links = getNavigation(user)
    return (
      <footer className={styles.Footer}>
        <div>
          {
            links.map(navElement => {
              return (
                <Nav
                  key={navElement.title}
                  href={navElement.link}
                  title={navElement.title}
                  type="footer"
                />
              )
            })
          }
        </div>
        <p className={styles.university}>Software University 2019</p>

      </footer>
    )
  }
}

export default Footer