import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Title from '../../../components/title'
import Container from '../../../components/container'
import Textarea from '../../../components/textarea'
import Error from '../../../components/error'
import Button from '../../../components/button'
import styles from './index.module.css';
import validate from '../../../utils/validator'
import getCookie from '../../../utils/cookie'
import UserContext from '../../../Context';


const NominateEmployeePage = () => {
    const [employee, setEmployee] = useState(null);
    const [isCreator, setIsCreator] = useState('');
    const [error, setError] = useState('');
    const [nomination, setNomination] = useState('');
    const [newNomination, setNewNomination] = useState('');

    const context = useContext(UserContext);
    const params = useParams();
    const history = useHistory();

    const id = params.id;

    const getEmployee = useCallback(async () => {
        const response = await fetch(`http://localhost:9999/api/employee/details?id=${id}`);

        if (!response.ok) {
            history.push('/error');
        } else {
            const employee = await response.json();

            const employeeCreatorId = employee.createdBy._id;
            const currentUserId = context.user.id;
            const isCreator = employeeCreatorId === currentUserId;

            setEmployee(employee);
            setIsCreator(isCreator);
        }
    }, [context.user.id, history, id])

    useEffect(() => {
        getEmployee();
    }, [getEmployee])


    const onSubmit = async (e) => {
        e.preventDefault();

        if (nomination === '') {
            setError('Nomination cannot be empty!');
            return;
        }

        await fetch('http://localhost:9999/api/nomination', {
            method: 'POST',
            body: JSON.stringify({
                nomination,
                employeeId: id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
            }
        }).then(res => {
            setNomination('');
            setNewNomination([...newNomination, 1])
        }).then(result => {
            history.push(`/`);
        }).catch(e => {
            console.log('Error: ', e);
        })
    }


    return (
        <Container>
                <Title title="Recognize a colleague!" />
            <form className={styles.container} onSubmit={onSubmit}>
                <div className={styles.input}>
                <Textarea 
                    value={nomination}
                    onChange={(e) => {
                        setNomination(e.target.value);
                    }}
                    id='nomination'
                    placeholder='Recognize your colleagues accomplishments'
                />
                </div>
                { error? <Error key={error} text={error} type="error" /> : null}
                <div className={styles.submit}>
                    <Button text="Send" type="submit" />
                </div>
            </form >
        </Container >
    );
}

export default NominateEmployeePage;