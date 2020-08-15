import React, { useState } from 'react';
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';
import Input from '../../components/input';
import Title from '../../components/title';
import SubmitButton from '../../components/button';
import getCookie from '../../utils/cookie';
import Nominations from '../../components/nominations';

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
      <div>
      <div className={styles.container}>
        <div>
          <textarea className={styles.textarea}>SPOT Award your collegue</textarea>
        </div>
        <div>
        <Input     value={voteNumber}
                   onChange={e => setVoteNumber(e.target.value)}
                   label="voteNumber"
                   id="voteNumber"/>
        </div>
        <div>
        <SubmitButton title="Nominate" onClick={handleSubmit} />
        </div>
        {/* TODO last 3 */}
        <Nominations />
      </div>
        </div>
      
      <p className={styles.note}>
      *Nominations are to be kept confidential until request has been approved*
      *Please DO NOT inform the nominee they have been nominated*
      </p>

    </PageLayout>
  )
}

export default NominatePage