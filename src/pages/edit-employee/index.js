import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input'
import Error from '../../components/error'
import Button from '../../components/button'
import styles from '../add-employee/index.module.css';
import validate from '../../utils/validator'
import getCookie from '../../utils/cookie'

const EditEmployeePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
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

        setName(employee.name);
        setEmail(employee.email);
        setPosition(employee.position);
    }, [params.id, history]);

    const onSubmit = (e) => {
        e.preventDefault();

        const errors = validate(name, email, position);

        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        fetch(`http://localhost:9999/api/employee/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                email,
                position,
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
        <PageLayout>
            <form className={styles.container} onSubmit={onSubmit}>
                <Title text="Edit Employee" />

                <div className={styles['input-field']}>
                    <Input
                        name="name"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles['input-field']}>
                    <Input
                        name="position"
                        value={position}
                        placeholder="Position"
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>

                {errors.map(error => (
                    <Error key={error} text={error} type="error" />
                ))}

                <div className={styles.submit}>
                    <Button text="Save" type="submit" />
                </div>

            </form >
        </PageLayout >
    );
}

export default EditEmployeePage;