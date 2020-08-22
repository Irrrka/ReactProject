import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Title from '../../../components/title';
import Container from '../../../components/container';
import Error from '../../../components/error';
import Button from '../../../components/button';
import styles from './index.module.css';
import validate from '../../../utils/validator';
import getCookie from '../../../utils/cookie';
import { withRouter } from 'react-router-dom';

const NominateEmployeePage = () => {
    const [nomination, setNomination] = useState('');
    const [errors, setErrors] = useState([]);
    const params = useParams();
    const history = useHistory();

    const getEmployee = useCallback(async () => {
        const id = params.id;
        const response = await fetch(`http://localhost:9999/api/employee/details/?id=${id}`);
        if (response.status === 500) {
            history.push('/');
        }
        const employee = await response.json();

        setNomination(employee.nominations);
    }, [params.id, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
    if (nomination.length < 10) {
        errors.push('Nomination cannot be less than 10 symbols!');
    }

        fetch(`http://localhost:9999/api/employee/nominate/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                nominations:nomination,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Auth': getCookie('x-auth-token')
            }
        }).then(response => {
            if (response) {

            }
            return response.json();
        }).then(result => {
            history.push(`/details/${params.id}`);
        })
    }

    useEffect(() => {
        getEmployee();
    }, [getEmployee]);

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <div className={styles.container} >
                <Title title="Recognize a colleague!" />
                <textarea className={styles.input} defaultValue="Recognize your colleague's accomplishments">
                </textarea>
                </div>
                {errors.map(error => (
                    <Error key={error} text={error} type="error" />
                ))}

                <div className={styles.submit}>
                    <Button text="Send" type="submit" />
                </div>

            </form >
        </Container >
    );
}

export default withRouter(NominateEmployeePage);