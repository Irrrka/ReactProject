import React, { Component } from 'react';
import styles from './index.module.css';
import profile from '../../images/profile.jpg';

const Employee = ({position, user}) => {
return (
//     <div class="card card-size  mb-4 mr-4 mt-3">
//     <a [routerLink]="['/project/']">
//       <h4 class="m-2">
//         <i class="badge badge-dot badge-info"></i>
//         LEXolution.Flow
//       </h4>
//     </a>
//   </div>


        <div className={styles.Post}>
            <img className={styles.img} src={logo} />
            <p className={styles.description}>
                <span>{index} - </span>
           {position} - 
           </p>
        <span className={styles.user}>{user.username}</span>
        </div>
    );
}

export default Employee;
