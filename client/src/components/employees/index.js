import React, { useState, useCallback, useEffect } from 'react';
import styles from './index.module.css';

import Employee from '../../components/employee';
import getEmployee from '../../utils/employees';

const Employees = (props) => {
    const[employees, setEmployees] = useState();

    const getEmployees = useCallback(async () => {
        const employees = await getEmployee(props);      
        setEmployees(employees)
      },[props])

      const renderEmployees = () => {
            const { employees } = this.state;
            return employees.map((employee) => {
                return (
                   <Employee key={employee._id} {...employee}/>
               );
           })
      }

      useEffect(() => {
              getEmployees()
           },[props.UpdatedEmployee, getEmployees]);

           return (
            <div className={styles["employees-wrapper"]}>
              {renderEmployees}
            </div>
          )
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
