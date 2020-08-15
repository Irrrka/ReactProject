import React, { Component, useState, useContext } from 'react';
import styles from './index.module.css';
import Title from '../../components/title';
import SubmitButton from '../../components/button';
import PageLayout from '../../components/page-layout';
import Input from '../../components/input';
import authenticate from '../../utils/authenticate';
import UserContext from '../../Context';

const LoginPage = (props) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const context = useContext(UserContext);

    const handleSubmit  = async (event) => {
        event.PreventDefault();

    await authenticate("http://localhost:9999/api/user/login", 
    {
        email,
        password,
    }, (user) => {
        context.login(user);
        props.history.push('/');
    }, (e) => {
        console.log("Error", e)
       })
    }


    return (
        <PageLayout>
        <form className={styles.container} onSubmit={this.handleSubmit}>
            <Title title="Login" />
            <div>
            <Input 
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   label="Email"
                   id="email"/>
            <Input type='password'
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   label="Password"
                   id="password"/>
            <SubmitButton title="Login" />
            </div>
        </form>
        </PageLayout>
    )
}


// class LoginPage extends Component {

//     constructor(props){
//         super(props)

//         this.state={
//             email:"",
//             password:"",
//         }
//     }

//     static contextType = UserContext;
    
//     handleSubmit  = async (event) => {
//          event.PreventDefault();

//          const {
//              email,
//              password
//          } = this.state;

//          handleChange = (event, type) => {
//              const newState = {};
//              newState[type] = event.target.value;
    
//              this.setState(newState);
//          }

//      authenticate("http://localhost:9999/api/user/login", 
//      {
//          email,
//          password,
//      }, (user) => {
//          this.context.login(user);
//          this.props.history.push('/');
//      }, (e) => {
//          console.log("Error", e)
//         })
       
//      }


//     render() {
//         const {
//             email,
//             password,
//         } = this.state;




//         return (
//             <PageLayout>
//             <form className={styles.container} onSubmit={this.handleSubmit}>
//                 <Title title="Login" />
//                 <Input 
//                        value={email}
//                        onChange={(e)=>this.handleChange(e, 'email')}
//                        label="Email"
//                        id="email"/>
//                 <Input type='password'
//                        value={password}
//                        onChange={(e)=>this.handleChange(e, 'password')}
//                        label="Password"
//                        id="password"/>
//                 <SubmitButton title="Login" />
//             </form>
//             </PageLayout>
//         )
//     }
// }
    
   

export default LoginPage