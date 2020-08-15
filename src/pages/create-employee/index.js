import React, { useState } from 'react'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import SubmitButton from '../../components/button'
import Input from '../../components/input'

import getCookie from '../../utils/cookie'

const CreateEmployeePage = () => {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [startDate, setStartDate] = useState('')
  const [updatedEmployees, setUpdatedEmployees] = useState([])

  const handleSubmit = async (user) => {
    await fetch('http://localhost:9000/api/employee', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        position: position,
        startDate: startDate,
        user: user._id
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getCookie('x-auth-token')
      }
    })

    setName('')
    setPosition('')
    setStartDate('')
    setUpdatedEmployees([...updatedEmployees, 1])
  }

  return (
    <PageLayout>
    <section className={styles.container}>
     <Title title="Join Our Endorcement System" />
   <form className={styles.container} onSubmit={handleSubmit}>
   <fieldset>
     <Input
       value={name}
       onChange={e => setName(e.target.value)}
       label="Name"
       id="name"
     />
       <Input
       value={position}
       onChange={e => setPosition(e.target.value)}
       label="Position"
       id="position"
     />
     <Input
       value={startDate}
       onChange={e => setStartDate(e.target.value)}
       label="StartDate"
       id="startDate"
     />
     <SubmitButton title="Join" />
     </fieldset>
   </form>
   </section>
 </PageLayout>
  )
}

export default CreateEmployeePage