import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PageLayout from '../../components/page-layout'
import Nominations from '../../components/nominations'
import UserContext from '../../Context'


const EmployeePage = () => {
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [position, setPosition] = useState(null)
  const [nominations, setNominations] = useState(null)
  const context = useContext(UserContext)
  const params = useParams()
  const history = useHistory()
  
  const nominate = () => {
    history.push('/nominate')
  }
  
  const getData = useCallback(async () => {
    console.log(params);
    const id = params.userid
    const response = await fetch(`http://localhost:9999/api/user?id=${id}`)

    if(!response.ok) {
      history.push('/error')      
    } else {
      const user = await response.json()
      setEmail(user.employee.email);
      setName(user.employee.name);
      setStartDate(user.employee.startDate);
      setPosition(user.employee.position);
      setNominations(user.employee.nominations && user.employee.nominations.length)
    }
  }, [params.userid, history])
  
  useEffect(() => {
    getData()
  }, [getData])

  if(!email) {
    return (
      <PageLayout>
        <div>Loading....</div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div>
        <h5>Name: {name}</h5>
        <h7>User: {email}</h7>
        <p>{startDate} - {position}</p>
        <p>Nominations: {nominations}</p>

        <button onClick={nominate}>Nominate</button>
      </div>
      <Nominations />
    </PageLayout>
  )
}

export default EmployeePage