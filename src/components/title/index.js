import React from 'react'
import styles from './index.module.css'

const Title = ({ title }) => {
  return (
    <h2 className={styles.title}><i>{title}</i></h2>
  )
}

export default Title