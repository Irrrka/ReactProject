import React from 'react'
import styles from './index.module.css'
import image from '../../images/blue-origami-bird.png'

const Nomination = ({ description, author, nominee, index }) => {
  return (
    <div className={styles.container}>
      <img alt="nomination" className={styles.image} src={image} />
      <div className={styles.description}>
        <span>{index} -</span>
        <div>{description}</div>
      </div>
      <p>
        <span className={styles.user}>
          <small>Author: </small>
          {author.username}
        </span>
      </p>
    </div>
  )
}

export default Nomination