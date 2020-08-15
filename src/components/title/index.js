import React from 'react'
import styles from './index.module.css'

const Title = ({ title }) => {
  return (
    <h1 className={styles.title}><i>{title}</i></h1>
  )
}

export default Title