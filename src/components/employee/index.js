import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import image from '../../images/profile.jpg'

const Employee = ({ _id, name, email, likes, position }) => {

    return (
        < div key={_id} className={styles.employee} >
            <img className={styles.image} src={image} alt="employee" />
            <h2>{name}</h2>
            <div className={styles.likes}>Likes: {likes.length}</div>
            <div>Email: {email}</div>
            <div>Position: {position}</div>
            <div className={styles.detailsBtn}>
                <Link to={`/details/${_id}`}  >
                    <p className={styles.detailsBtnText}>View Details</p>
                </Link>
            </div>
        </div >
    );
}

export default Employee;