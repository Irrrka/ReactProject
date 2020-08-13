import React, { useState } from 'react'
import styles from './index.module.css';
import PageLayout from '../../components/page-layout'
import Input from '../../components/input'
import Title from '../../components/title'
import Origamis from '../../components/origamis'
import SubmitButton from '../../components/button/submit-button'
import getCookie from '../../utils/cookie'

const NominatePage = () => {
  const [nomination, setNomination] = useState('')
  const [voteNumber, setVoteNumber] = useState('')
  //const [updatedEmployee, setUpdatedEmployee] = useState([])

  const handleSubmit = async () => {
    await fetch('http://localhost:9999/api/nomination', {
      method: 'POST',
      body: JSON.stringify({
        description: nomination,
        voteNumber,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('x-auth-token')
      }
    })

    setNomination('');
    setVoteNumber('1');
    //setUpdatedEmployee([...updatedEmployee, 1])
  }

  return (
    
    <PageLayout>
      <Title title="SPOT Award Nomination" />
      <Container>
        <div>
          <TextArea value={nomination} onChange={e => setNomination(e.target.value)} />
        </div>
        <div>
        <Input value={voteNumber} onChange={(e) => {
          console.log(e.target.value)
          onChange(e.target.value)}} label="voteNumber" id="voteNumber"/>
        </div>
        <div>
          <SubmitButton title="Nominate" onClick={handleSubmit} />
        </div>
      </Container>
      
      <p className={styles.note}>
      *Nominations are to be kept confidential until request has been approved*
      *Please DO NOT inform the nominee they have been nominated*
      </p>

    </PageLayout>
  )
}

export default NominatePage