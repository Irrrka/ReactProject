import React from 'react';
import styles from './index.module.css';


const Nomination = ({ _id, nomination, employeeId }) => {

    const Employee = ({ _id, name, email, position, nominations}) => {


    return (
            <div key={_id} className={styles.container} >
                 <h3 > {employeeId.name}</h3>
                <div><i><b>Nomination: </b></i> {nomination}</div>
                <div><i><b>CreatedBy: </b></i>{_id}</div>
            </div >
    )
}
}

export default Nomination;