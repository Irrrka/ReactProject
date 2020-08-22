import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import image from '../../images/profile.jpg'

const Employee = ({ _id, name, email, position, nominations}) => {

    return (
        <Link to={`/details/${_id}`}>
            <div key={_id} className={styles.container} >
            <span className={styles.name}><h2><i>{name}</i></h2></span>
                <img className={styles.image} src={image} alt="employee" />
                <div className={styles.nominations}><i><b>Nominations: </b></i> {nominations.length}</div>
                <div><i><b>Email: </b></i> {email}</div>
                <div><i><b>Position: </b></i>{position}</div>
            </div >
        </Link>
    );
}

export default Employee;