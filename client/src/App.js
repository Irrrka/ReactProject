import React, {useState, Component} from 'react';
import UserContext from './Context';

const App = (props) => {
    const[user,setUser] = useState(null);

    login = (user) => {
        setUser({
            ...user,
            loggedIn:true,
        })
    } 
    logout = () => {
        setUser({
            loggedIn:false,
        })
    } 

        return (
            <UserContext.Provider value={{
                user,
                login,
                logout
            }}>
                props.children;
            </UserContext.Provider>
        )

}



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

export default App