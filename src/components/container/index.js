import React from 'react'
import Header from '../header'
import styles from './index.module.css'
import Footer from '../footer'

const Container = (props) => {
  return (
    <div className={styles.app}>
            <Header />
            {/* <div className={styles.container}> */}
                {props.children}
            {/* </div> */}
            <Footer type={props.footer} />
        </div>
  )
}

export default Container
