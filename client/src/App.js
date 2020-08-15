import React, { useState, useEffect } from 'react'
import UserContext from './Context'
import getCookie from './utils/cookie'

const App = (props) => {

  const [user, setUser] = useState(props.user ? {
    ...props.user,
    loggedIn: true
  } : null)
  const employees = props.employees || []
  
  const logIn = (userObject) => {
    setUser({
      ...userObject,
      loggedIn: true
    })
  }

  const logOut = () => {
    document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    setUser({
      loggedIn: false
    })
  }
  
  console.log('user', user)

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut,
      employees
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default App













// import React, {useState, useEffect, Component} from 'react';
// import UserContext from './Context';


// const App = (props) => {
//     const [user, setUser] = useState(props.user ? {
//         ...props.user,
//         loggedIn: true
//       } : null)
//       const employees = props.employees || []

//     login = (user) => {
//         setUser({
//             ...user,
//             loggedIn:true,
//         })
//     } 

//     logout = () => {
//         setUser({
//             loggedIn:false,
//         })
//     } 

//     return (
//         <UserContext.Provider value={{
//           user,
//           logIn,
//           logOut,
//           employees
//         }}>
//           {props.children}
//         </UserContext.Provider>
//       )

// }



// class App extends Component {
//     constructor(props){
//         super(props)

//         this.state = {
//             loggedIn:false,
//             user:null
//         }
//     }

//     componentDidMount(){

//     }


   
//     changeLoggedIn = () => {
//         this.state({
//             loggedIn:!this.state.loggedIn
//         })
//     }

//     render() {
//         const {
//             loggedIn,
//             user
//         } = this.setState;

//         // if (loggedIn===null) {
//         //     <div>Loading...</div>
//         // }
//         return (
//             <UserContext.Provider value={{
//                 loggedIn,
//                 user,
//                 login:this.login,
//                 logout:this.logout
//             }}>
//                 this.props.children;
//             </UserContext.Provider>
//         )
//     }
// }
