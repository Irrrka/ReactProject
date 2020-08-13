import React from 'react'
import styles from './index.module.css'

const Nomination = ({ description, author, voteNumber }) => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <span>{voteNumber} -</span>
        <div>{description}</div>
      </div>
      <p>
        <span className={styles.user}>
          <small>Author: </small>
          {author.email}
        </span>
      </p>
    </div>
  )
}

export default Nomination