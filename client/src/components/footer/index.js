import React, { Component } from 'react'
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
        <p className={styles.university}>Employee-book - Individual React Project for Software University 2020</p>
      </footer>
    )
  }
}

export default Footer