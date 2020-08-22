import React, { Component, useCallback, useContext, useState, useEffect } from 'react';
import Container from '../../../components/container';
import Title from '../../../components/title';
import UserContext from '../../../Context';
import Employees from '../../../components/employees';
import styles from './index.module.css';
import Button from '../../../components/button';
import { useParams, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class ProfilePage extends Component {

  static contextType = UserContext;

  constructor(props) {
      super(props);

      this.state = {
          username: '',
          id:'',
          employees: [],
          errors: []
      };
  }

  componentDidMount() {
    const id = this.context.user.id
    this.setState({id});
     this.getUser(id);
  }

    getUser = async (id) => {
      const response = await fetch(`http://localhost:9999/api/user?id=${id}`);
      const user = await response.json();
      this.setState({
          username: user.username,
          id: user.id,
          employees: user.employees
      });
  }

  render(){
    const {
      username,
      employees,
    } = this.state;

    return (
     <Container>
        <div className={styles.container}>
        <Title title="Profile" />
          <div className={styles.ininputout}>
          <i>Your Company <b>{username}</b> has already <b>{employees.length}</b>  employees!
          </i></div>
      </div>
      <div className={styles.submit}>
        <Button text="Logout" type="submit" onClick={()=>this.context.logout()} />
      </div>
     </Container>
    )
  }
}

 





// const ProfilePage = () => {
//     const context = useContext(UserContext);
//     const loggedIn = context.user && context.logged;
//     const [username, setUsername] = useState(null)
//   const [employees, setEmployees] = useState(null)
//   const params = useParams();
//   const history = useHistory();

//   const logout = () => {
//       context.logout();
//       history.push('/');
//   }

//   const getUser = useCallback(async () => {
//       console.log('context: ' + context)
//       console.log('loggedIn: ' + loggedIn)
//     const id = params.id
//     const response = await fetch(`http://localhost:9999/api/user?id=${id}`)

//     if(!response.ok) {
//       history.push('/error')      
//     } else {
//       const user = await response.json()
//       setUsername(user.username)
//       setEmployees(user.employees && user.employees.length)
//     }
//   }, [params.userid, history])

//     useEffect(() => {
//         getUser()
//     },[getUser])

//     if(!username) {
//         return (
//           <Container>
//             <div>Loading....</div>
//           </Container>
//         )
//       }

//     return (
//     <Container>
//       <div>
//         <p>Your Company {username} has already</p>
//         <span>{employees.length} employees!</span>

//         <Button onClick={logout}>Logout</Button>
//       </div>
//       <Employees />
//     </Container>
//   )
// }

export default withRouter(ProfilePage);