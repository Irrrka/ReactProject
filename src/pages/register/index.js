import React, { Component } from 'react'
import Title from '../../components/title'
import SubmitButton from '../../components/button'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input'
import authenticate from '../../utils/authenticate'
import UserContext from '../../Context'

class RegisterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      rePassword: ""
    }
  }

  static contextType = UserContext

  onChange = (event, type) => {
    const newState = {}
    newState[type] = event.target.value

    this.setState(newState)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const {
      email,
      password
    } = this.state

    await authenticate('http://localhost:9000/api/user/register', {
        email,
        password
      }, (user) => {
        this.context.logIn(user)
        this.props.history.push('/create')
      }, (e) => {
        console.log('Error', e)
      }
    )
  }

  render() {
    const {
      email,
      password,
      rePassword
    } = this.state

    return (
      <PageLayout>
         <section className={styles.container}>
              <Title title="Register" />
            <form onSubmit={this.handleSubmit}>
            <fieldset>
            <Input
              value={email}
              onChange={(e) => this.onChange(e, 'email')}
              label="Email"
              id="email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => this.onChange(e, 'password')}
              label="Password"
              id="password"
            />
            <Input
              type="password"
              value={rePassword}
              onChange={(e) => this.onChange(e, 'rePassword')}
              label="Repeat Password"
              id="re-password"
            />
            <SubmitButton title="Register" />
          </fieldset>
        </form>
        </section>
      </PageLayout>
    )
  }
}

export default RegisterPage