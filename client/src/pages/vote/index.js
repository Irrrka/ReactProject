import React, { useState } from 'react';
import Header from '../../components/header';
import styles from './home-page.module.css';
import Aside from '../../components/aside';
import Employees from '../../components/employees';
import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import SubmitButton from '../../components/button';
import getCookie from '../../utils/cookie';

const Vote = () => {
  const[vote, setVote] = useState('');
  const[updateEmployee, setUpdatedEmployee] = useState([]);

  const handleSubmit = async () => {
    const promise = await fetch((`http://localhost:9999/api/employee`), {
      method: "POST",
      body: JSON.stringify({
        description: description,
        //vote+1?
      }),
      headers:{
        'Content-type':'application/json',
        'Authorization':getCookie('x-auth-token')
      }
    })

    const data = await promise.json();
    console.log(data);
    setVote('');
    const employees = await getEmployee(3);
    setUpdatedEmployee(employees);
  }

  return (
    <PageLayout>
        <Title title="Vote for your collegue" />
        <div className={styles.container}>
          <div>
            <textarea value={vote} className={styles.textarea} 
            //defaultValue="Describe what your nomination is for" 
            onChange={e => e.setVote(e.target.value)}>

            </textarea>
          </div>
          <div>
            <input>Put a remark from 0 to 10</input>
          </div>
          <div>
            <SubmitButton title="Vote" onClick={handleSubmit()}/>
          </div>
        </div>
          <Employees length={3}/>
    </PageLayout>
  );
}

export default Vote;
