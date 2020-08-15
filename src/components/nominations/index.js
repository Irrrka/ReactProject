import React, { useState, useCallback, useEffect, useMemo, useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import Nomination from '../nomination'


const Nominations = (props) => {
  const context = useContext(UserContext)
  const [nominations, setNominations] = useState(context.nominations || [])

  const getNominations = useCallback(async () => {
    const nominations = await getNominations(props.length)
    setNominations(nominations)
  }, [props.length])

  const renderNominations = useMemo(() => {
    return nominations.map((nomination, index) => {
      return (
        <Nomination key={nomination._id} index={index} {...nomination} />
      )
    })
  }, [nominations])

  useEffect(() => {
    getNominations()
  }, [props.updatedNomination, getNominations])

  return (
    <div className={styles.wrapper}>
      {renderNominations}
    </div>
  )
}

export default Nominations
