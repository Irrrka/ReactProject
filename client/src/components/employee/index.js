import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import UserContext from '../../Context'


const Employee = () => {
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const context = useContext(UserContext)
  const params = useParams()
  const history = useHistory()
  
  const details = () => {
    history.push('/employee')
  }
  
  const getData = useCallback(async () => {
    const id = params.userid
    const response = await fetch(`http://localhost:9999/api/user?id=${id}`)

    if(!response.ok) {
      history.push('/error')      
    } else {
      const user = await response.json()
      setEmail(user.email)
      setName(user.employee.name)
    }
  }, [params.userid, history])
  
  useEffect(() => {
    getData()
  }, [getData])

  return (
      <div>
        <p>Name: {name}</p>
        <p>User: {email}</p>

        <button onClick={details}>Details</button>
      </div>
  )
}

export default Employee