// import React, { Component } from 'react';
// import Container from '../../../components/container';
// import styles from './index.module.css';
// import Title from '../../../components/title';
// import Button from '../../../components/button';
// import UserContext from '../../../Context';
// import getCookie from '../../../utils/cookie';

// class EmployeeDetailsPage extends Component {
//     static contextType = UserContext;

//     constructor(props) {
//         super(props);

//         this.state = {
//             name: '',
//             email: '',
//             position: '',
//             createdBy: '',
//             nominations: [],
//         }
//     }

//     isAlreadyNominated = () => {
//         const {
//             nominations
//         } = this.state;

//         const {
//             username
//         } = this.context.user;

//         let isNominated = false;

//         nominations.forEach(nomination => {
//             if (nomination.username === username) {
//                 isNominated = true;
//             }
//         });

//         return isNominated;
//     }

//     getEmployee = async () => {
//         const id = this.props.match.params.id;
//         const response = await fetch(`http://localhost:9999/api/employee/details/?id=${id}`);
//         const employee = await response.json();
//         this.setState({
//             ...employee
//         });
//     }


//     renderNominations() {
//         const {
//             nominations,
//             createdBy
//         } = this.state;

//         if (nominations.length === 0) {
//             return (
//                 <p>Nobody nominated yet!</p>
//             )
//         }

//         return (
//             nominations.reverse().map((nomination) => {
//                 return (
//                     <p key={nomination._id} className={styles.field}>{createdBy.username}: {nomination}</p>
//                 );
//             })
//         );
//     }

//     nominate = () => {
//         this.props.history.push(`/nominate/${this.props.match.params.id}`)
//     }

//     edit = () => {
//         this.props.history.push(`/edit/${this.props.match.params.id}`)
//     }

//     delete = () => {
//         const id = this.props.match.params.id;;
//         fetch(`http://localhost:9999/api/employee/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Auth': getCookie('x-auth-token')
//             }
//         }).then(response => {
//             return response.json();
//         }).then(result => {
//            if(result) {
//                this.props.history.push('/');
//            }
//         })
//     }

//     renderButtons() {
//         const {
//             createdBy,
//         } = this.state;

//         if (this.context.logged) {
//             const {
//                 username
//             } = this.context.user;

//             if (createdBy.username !== username) {
//                 const isNominated = this.isAlreadyNominated();
//                 if (isNominated) {
//                     return (
//                         <div className={styles.button}>
//                             <Button text="Nominate" onClick={this.nominate} type="detail" disabled/>
//                         </div>
//                     );
//                 }else {
//                     return (
//                         <div className={styles.button}>
//                             <Button text="Nominate" onClick={this.nominate} type="detail"/>
//                         </div>
//                     );
//                 }
//             }else {
//                 return (
//                     <div className={styles.button}>
//                         <Button text="Edit" onClick={this.edit} type="detail" />
//                         <Button text="Delete" onClick={this.delete} type="detail" />
//                     </div>
//                 );
//             }
//         }
//     }

//     componentDidMount() {
//         this.getEmployee();
//     }


//     render() {
//         const {
//             name,
//             email,
//             position,
//             createdBy,
//         } = this.state;

//         return (
//             <Container>
//                 <div className={styles.container} >
//                     <Title title={name} />
//                     <div className={styles.details}>
//                         <div className={styles.buttons}>{this.renderButtons()}</div>
//                         <div className={styles.field}>Added by: <i><b>{createdBy.username}</b></i></div>
//                         <div className={styles.field}>Email: <i><b>{email}</b></i></div>
//                         <div className={styles.field}>Position: <i><b>{position}</b></i></div>
//                         <div className={styles.field}>{name} already has <i><b>{this.renderNominations()}</b></i> nominations!</div>
//                     </div>
//                     {/* <div className={styles.details}>
//                         Nominationed by: <i><b>{this.renderNominations()}</b></i>
//                     </div> */}
//                 </div >
//             </Container>
//         )
//     }
// }

// export default EmployeeDetailsPage;