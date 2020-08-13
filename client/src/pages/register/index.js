import React, { Component } from 'react';
import styles from './index.module.css';
import Title from '../../components/title';
import SubmitButton from '../../components/button';
import PageLayout from '../../components/page-layout';
import Input from '../../components/input';
import authenticate from '../../utils/authenticate';
import UserContext from '../../Context';


class RegisterPage extends Component {

    constructor(props){
        super(props)

        this.state={
            email:"",
            password:"",
            rePassword:"",
        }
    }

    static contextType = UserContext;

    handleSubmit  = async (event) => {
        event.PreventDefault();

        const {
            email,
            password
        } = this.state;

        authenticate("http://localhost:9999/api/user/register", 
        {
            email,
            password,
        }, (user) => {
            this.context.login(user);
            this.props.history.push('/');
        }, (e) => {
            console.log("Error", e)
        })
      
    }
    
    render() {
        const {
            email,
            password,
            rePassword
        } = this.state;

        onChange = (event, type) => {
            const newState = {};
            newState[type] = event.target.value;

            this.setState(newState);
        }

        return (
            <PageLayout>
            <form className={styles.container}>
                <Title title="Register" />
                <Input value={email}
                       onChange={(e)=>this.onChange(e, 'email')}
                       label="Email"
                       id="email"/>
                 <Input type='password'
                       value={password}
                       onChange={(e)=>this.onChange(e, 'password')}
                       label="Password"
                       id="password"/>
                <Input type='password'
                       value={password}
                       onChange={(e)=>this.onChange(e, 'rePassword')}
                       label="Re-Password"
                       id="re-password"/>
                <SubmitButton title="Register" />
            </form>
            </PageLayout>
        )
    }
}
    
   

export default RegisterPage