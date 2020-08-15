import React, { useState, useCallback, useEffect, useMemo, useContext } from 'react'
import styles from './index.module.css'
import getNominations from '../../utils/nominations'
import UserContext from '../../Context'
import Nomination from '../nomination'


const Nominations = (props) => {
  const context = useContext(UserContext)
  const [nominations, setNominations] = useState(context.nominations || [])

  const getNominations = useCallback(async () => {
    const nominations = await getNominations()
    setNominations(nominations)
  }, [])

  const renderNominations = useMemo(() => {
    return nominations.map((nomination, voteNumber) => {
      return (
        <Nomination key={nomination._id} voteNumber={voteNumber} {...nomination} />
      )
    })
  }, [nominations])

  useEffect(() => {
    getNominations()
  }, [props.updatedNominations, getNominations])

  return (
    <div className={styles["nominations-wrapper"]}>
      {renderNominations}
    </div>
  )
}

export default Nominations