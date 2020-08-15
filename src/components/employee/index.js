import React from 'react'
import styles from './index.module.css'
import image from '../../images/blue-origami-bird.png'

const Employee = ({ username, position, startDate, user, index }) => {
  return (
    <div className={styles.container}>
      <img alt="employee" className={styles.image} src={image} />
      <div className={styles.description}>
      <p>{username} -</p>
        <span>{startDate} -</span>
        <div>{position}</div>
      </div>
      <p>
        <span className={styles.user}>
          <small>Author: </small>
          {user.username}
        </span>
      </p>
    </div>
  )
}

export default Employee