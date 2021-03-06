import React, { Component } from 'react';
import Container from '../../../components/container';
import styles from './index.module.css';
import Title from '../../../components/title';
import Button from '../../../components/button';
import UserContext from '../../../Context';
import getCookie from '../../../utils/cookie';

class EmployeeDetailsPage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            position: '',
            createdBy: '',
            nominations: []
        }
    }

    // nominated = () => {
    //     const {
    //         nominations
    //     } = this.state;

    //     const {
    //         username
    //     } = this.context.user;

    //     let isNominated = false;

    //     nominations.forEach(nomination => {
    //         if (nomination.username === username) {
    //             isNominated = true;
    //         }
    //     })

    //     return isNominated;
    // }

    getEmployee = async () => {
        console.log(this.props.match.params.id);
        const id = this.props.match.params.id;
        const response = await fetch(`http://localhost:9999/api/employee/details/?id=${id}`);
        const employee = await response.json();
        this.setState({
            ...employee
        });
    }

    renderNominations() {
        const {
            nominations
        } = this.state;

        if (nominations.length === 0) {
            return (
                <div className={styles.likes}>Nobody voted yet!</div>
            )
        }

        return (
            nominations.map((nomination) => {
                return (
                    <p key={nomination._id} className={styles.field}>{nomination.nomination}</p>
                );
            })
        );
    }

    // like = () => {
    //     const id = this.props.match.params.id;;
    //     fetch(`http://localhost:9999/api/employee/like/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': getCookie('x-auth-token')
    //         }
    //     }).then(response => {
    //         return response.json();
    //     }).then(result => {
    //         if (result) {
    //             this.setState({
    //                 likes: result.likes
    //             })
    //         }
    //     })
    // }

    // nominate = () => {
    //     const id = this.props.match.params.id;;
    //     fetch(`http://localhost:9999/api/employee/nominate/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': getCookie('x-auth-token')
    //         }
    //     }).then(response => {
    //         return response.json();
    //     }).then(result => {
    //         if (result) {
    //             this.setState({
    //                 nominations: result.nomination
    //             })
    //         }
    //     })
    // }

    edit = () => {
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }
    nominate = () => {
        this.props.history.push(`/nominate/${this.props.match.params.id}`)
    }

    delete = () => {
        const id = this.props.match.params.id;;
        fetch(`http://localhost:9999/api/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
            }
        }).then(response => {
            return response.json();
        }).then(result => {
           if(result) {
               this.props.history.push('/');
           }
        })
    }

    renderButtons() {
        const {
            createdBy,
        } = this.state;

        if (this.context.logged) {
            const {
                username
            } = this.context.user;

            if (createdBy.username !== username) {

                return (
                    <div className={styles.button}>
                        <Button text="Nominate" onClick={this.nominate} />
                    </div>
                );
            }

            return (
                <div className={styles.button}>
                    <Button text="Edit" onClick={this.edit} type="detail" />
                    <Button text="Delete" onClick={this.delete} type="detail" />
                    <Button text="Nominate" onClick={this.nominate} />
                </div>
            );

        }
    }

    componentDidMount() {
        this.getEmployee();
    }

    render() {
        const {
            name,
            email,
            position,
            nominations,
            createdBy,
        } = this.state;

        return (
            <Container>
                <Title text="Employee" />
               
                <div className={styles.container} >

                    <div className={styles.details}>
                        <Title title={name} />
                        <div className={styles.buttons}>{this.renderButtons()}</div>
                        <div className={styles.field}>Added by: <i><b>{createdBy.username}</b></i></div>
                        <div className={styles.field}>Email: <i><b>{email}</b></i></div>
                        <div className={styles.field}>Position: <i><b>{position}</b></i></div>
                        
                    </div>
                    <div className={styles.details}>
                        Nominationed by: <i><b>{this.renderNominations()}</b></i>
                    </div>
                </div >

            </Container>
        )
    }
}

export default EmployeeDetailsPage;