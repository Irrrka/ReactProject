import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Title from '../../../components/title'
import Container from '../../../components/container'
import Input from '../../../components/input'
import Error from '../../../components/error'
import Button from '../../../components/button'
import styles from './index.module.css';
import validate from '../../../utils/validator'
import getCookie from '../../../utils/cookie'
import { withRouter } from 'react-router-dom';

const NominateEmployeePage = () => {
    const [error, setError] = useState([]);
    const [nomination, setNomination] = useState([]);
    const params = useParams();
    const history = useHistory();

    // const getEmployee = useCallback(async () => {
    //     const id = params.id;
    //     const response = await fetch(`http://localhost:9999/api/employee/details/?id=${id}`);
    //     if (response.status === 500) {
    //         history.push('/');
    //     }
    //     const employee = await response.json();

    //     setNominations(employee.nominations);
    // }, [params.id, history]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (nomination === '') {
            setError('Nomination cannot be empty!');
            return;
        }

        fetch(`http://localhost:9999/api/employee/nominate/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                nominations:{push:nomination}
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorizations': getCookie('x-auth-token')
            }
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.status === 400) {
                setError('Nomination text is required!');
                return;
            }
            history.push(`/details/${params.id}`);
        }).catch(e => {
            setError('Error');
        })
    }

    return (
        <Container>
            <form className={styles.container} onSubmit={onSubmit}>
                <Title title="Recognize a colleague!" />
                <div className={styles.input}>
                    <textarea className={styles.input} defaultValue="Recognize your colleague's accomplishments">
                    </textarea>
                </div>
                { error? <Error key={error} text={error} type="error" /> : null}
                <div className={styles.submit}>
                    <Button text="Send" type="submit" />
                </div>
            </form >
        </Container >
    );
}

export default withRouter(NominateEmployeePage);