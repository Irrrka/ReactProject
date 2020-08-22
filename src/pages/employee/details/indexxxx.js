import React, { Component } from 'react';
import Container from '../../../components/container';
import styles from './index.module.css';
import Title from '../../../components/title';
import Button from '../../../components/button';
import UserContext from '../../../Context';
import getCookie from '../../../utils/cookie';
import image from '../../../images/profile.jpg'

class EmployeeDetailsPage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            position: '',
            createdBy: '',
            nominations: [],
        }
    }

    likedOrNot = () => {
        const {
            nominations
        } = this.state;

        const {
            username
        } = this.context.user;

        let likedAlready = false;

        nominations.forEach(like => {
            if (like.username === username) {
                likedAlready = true;
            }
        })

        return likedAlready;
    }

    getEmployee = async () => {
        const id = this.props.match.params.id;
        const response = await fetch(`http://localhost:9999/api/employee/details/?id=${id}`);
        const employee = await response.json();
        this.setState({
            ...employee
        });
    }

    renderLikes() {
        const {
            nominations
        } = this.state;

        if (nominations.length === 0) {
            return (
                <div className={styles.likes}>no one yet.</div>
            )
        }

        let moreLikes = '';

        if (nominations.length > 1) {
            moreLikes = ` and ${nominations.length - 1} more.`;
        }

        return (
            nominations.reverse().slice(0, 1).map((nomination) => {
                return (
                    <p key={nomination._id} className={styles.likes}>{nomination.username}{moreLikes}</p>
                );
            })
        );
    }

    like = () => {
        const id = this.props.match.params.id;;
        fetch(`http://localhost:9999/api/employee/nominate/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Auth': getCookie('x-auth-token')
            }
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result) {
                this.setState({
                    nominations: result.nominations
                })
            }
        })
    }

    edit = () => {
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }

    delete = () => {
        this.setState({
            deleteClick: true
        });
    }

    delete = () => {
        const id = this.props.match.params.id;;
        fetch(`http://localhost:9999/api/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Auth': getCookie('x-auth-token')
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

                const likedAlready = this.likedOrNot();

                if (likedAlready) {
                    return (
                        <div className={styles.liked}>You already voted.</div>
                    );
                }

                return (
                    <div className={styles['button-container']}>
                        <Button text="Like" onClick={this.like} type="detail" />
                    </div>
                );
            }
            return (
                <div className={styles['button-container']}>
                    <Button text="Edit" onClick={this.edit} type="detail" />
                  
                        <Button text="Delete" onClick={this.delete} type="detail" />
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
            createdBy
        } = this.state;

        return (
            <Container footer="form">
                <Title text="Book Details" />
                < div className={styles[`book-container`]} >

                    <div className={styles['img-container']}>
                        <img className={styles[`book-cover`]} src={image} alt="Book" />
                    </div>

                    <div className={styles['data-container']}>
                        <h1>{name}</h1>
                        <div className={styles.likes}>Liked by: {this.renderLikes()}</div>
                        <div className={styles['detail-buttons']}>{this.renderButtons()}</div>
                        <div className={styles.field}>Posted by: {createdBy.username}</div>
                        <div className={styles.field}>Email: {email}</div>
                        <div className={styles.field}>Position: {position}</div>
                        <div className={styles['opinion-title']}>{createdBy.username}'s opinion on the employee:</div>
                        {/* <textarea className={styles.nomination} value={opinion} readOnly /> */}
                    </div>
                </div >
            </Container>
        )
    }
}

export default EmployeeDetailsPage;