import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import Title from '../../components/title'
import SubmitButton from '../../components/button'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input'
import authenticate from '../../utils/authenticate'
import UserContext from '../../Context'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const context = useContext(UserContext)
  const history = useHistory()
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    await authenticate('http://localhost:9000/api/user/login', {
        email,
        password
      }, (user) => {
        context.logIn(user)
        history.push('/create')
      }, (e) => {
        console.log('Error', e)
      }
    )
  }

  return (
    <PageLayout>
       <section className={styles.container}>
        <Title title="Login" />
      <form className={styles.container} onSubmit={handleSubmit}>
      <fieldset>
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          label="email"
          id="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          label="Password"
          id="password"
        />
        <SubmitButton title="Login" />
        </fieldset>
      </form>
      </section>
    </PageLayout>
  )
}

export default LoginPage