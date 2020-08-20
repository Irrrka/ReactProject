import React, { useState, useContext, useEffect, useCallback } from 'react';
import Employees from '../all-employees';
import PageLayout from '../../components/page-layout';
import Title from '../../components/title';
import UserContext from '../../Context';
import styles from './index.module.css';
import { useParams, useHistory } from 'react-router-dom';


const ProfilePage = () => {
    const [username, setUsername] = useState(null);
    const [employees, setEmployees] = useState(null);
    const context = useContext(UserContext);
    const params = useParams();
    const history = useHistory();

const logout = () => {
    context.logout();
    history.push('/');
}

const getData = useCallback(async () => {
    console.log("params" + params);
    const id = params.id;
    const response = await fetch(`http://localhost:9999/api/user?id=${id}`);
    console.log("response" + response.json)

    if (!response.ok) {
        history.push('/error');
    } else {
        const user = await response.json();
        setUsername(user.username);
        setEmployees(user.employees && user.employees.length);
        //const likes = employees.map(employees => employees.likes.length).reduce((a, b) => a + b, 0);
    }  
},[params.id, history]);

    useEffect(() => {
        getData();
    },[getData])

    if(!username){
        return (
            <PageLayout>
                <div>Loading...</div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <Title text="Profile" />
            <div className={styles.card}>
            <h1>{username}</h1>
                <p className={styles.title}>Your Company {username} has already: {employees.length} employees.</p>
                <p className={styles.title}>Nomination statistics: {}</p>
            <button onClick={logout}>Logout</button>
            </div>
        {/* <Employees /> */}
        </PageLayout >
    )

}

export default ProfilePage;