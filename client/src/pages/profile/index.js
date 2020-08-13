import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PageLayout from '../../components/page-layout'
import Nominations from '../../components/origamis'
import UserContext from '../../Context'


const ProfilePage = () => {
  const [email, setEmail] = useState(null)
  const [posts, setPosts] = useState(null)
  const context = useContext(UserContext)
  const params = useParams()
  const history = useHistory()
  
  const logOut = () => {
    context.logOut()
    history.push('/')
  }
  
  const getData = useCallback(async () => {
    const id = params.userid
    const response = await fetch(`http://localhost:9999/api/user?id=${id}`)

    if(!response.ok) {
      history.push('/error')      
    } else {
      const user = await response.json()
      setEmail(user.email)
      setPosts(user.posts && user.posts.length)
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
        <p>User: {email}</p>
        <p>Posts: {posts}</p>

        <button onClick={logOut}>Logout</button>
      </div>
      <Origamis length={3} />
    </PageLayout>
  )
}

export default ProfilePage