import React, { useState, useCallback, useEffect } from 'react';
import styles from './home-page.module.css';

import { Component } from 'react';
import Employee from '../employee';

const Employees = (props) => {
    const[employees, setEmployees] = useState();
    //const[votes, setVotes] = useState();

    getEmployees = useCallback(async () => {
        const employees = await getEmployees(props.length);      
        setEmployees(employees)
      },[props.length])

      const renderEmployees = () => {
            const { employees } = this.state;
            return employees.map((employee, index) => {
                return (
                   <Employee key={employee._id} index={index} {...employee}/>
               );
           })
      }

      useEffect(() => {
              getEmployees()
           },[props.UpdatedEmployee, getEmployees]);

    return (
        <div className={styles.Main}>
          <div className={styles.Posts}>
              {renderEmployees()}
          </div>
      </div>
  );
}

// class Employees extends Component {

//      constructor(props){
//          super(props)

//          this.state = {
//              employees:[]
//          }
//      }

//     getEmployees = async () => {
//         const { length } = this.props
//         const promise = await fetch(`http://localhost:9999/api/employee?length=${length}`)
//         const employees = await promise.json()
//         this.setState({
//             employees
//         })
//       }

//     renderEmployees = () => {
//         const { employees } = this.state;
//         return employees.map((employee, index) => {
//             return (
//                <Employee key={employee._id} index={index} {...employee}/>
//            );
//        })
//     }

//     componentDidMount(){
//         this.getEmployees();
//     }

//     render() {
//         return (
//               <div className={styles.Main}>
//                 <div className={styles.Posts}>
//                     {this.renderEmployees()}
//                 </div>
//             </div>
//         );
//   }
// }


export default Employees;
