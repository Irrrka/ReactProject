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
            deleteClick: false,
            likes: []
        }
    }

    liked = () => {
        const {
            likes
        } = this.state;

        const {
            username
        } = this.context.user;

        let isLiked = false;

        likes.forEach(like => {
            if (like.username === username) {
                isLiked = true;
            }
        })

        return isLiked;
    }

    getEmployee = async () => {
        console.log(this.props.match.params.id);
        const id = this.props.match.params.id;
        const response = await fetch(`http://localhost:9999/api/employee/details/?id=${id}`);
        const employee = await response.json();
        this.setState({
            ...employee
        });
    }

    renderLikes() {
        const {
            likes
        } = this.state;

        if (likes.length === 0) {
            return (
                <div className={styles.likes}>Nobody liked yet!</div>
            )
        }

        //let moreLikes = '';

        // if (likes.length > 1) {
        //     moreLikes = ` and ${likes.length - 1} more.`;
        // }

        return (
            likes.reverse().slice(0, 1).map((like) => {
                return (
                    <p key={like._id} className={styles.likes}>{like.username}{likes}</p>
                );
            })
        );
    }

    renderNominations() {
        const {
            nominations,
            createdBy
        } = this.state;

        if (nominations.length === 0) {
            return (
                <div className={styles.likes}>Nobody nominated yet!</div>
            )
        }

        //let moreLikes = '';

        // if (likes.length > 1) {
        //     moreLikes = ` and ${likes.length - 1} more.`;
        // }

        return (
            nominations.reverse().slice(0, 1).map((nomination) => {
                return (
                    <p key={nomination._id} className={styles.field}>{createdBy.username}{nomination}</p>
                );
            })
        );
    }

    like = () => {
        const id = this.props.match.params.id;;
        fetch(`http://localhost:9999/api/employee/like/${id}`, {
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
                    likes: result.likes
                })
            }
        })
    }

    nominate = () => {
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
                    nominations: result.nomination
                })
            }
        })
    }

    edit = () => {
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }

    // delete = () => {
    //     this.setState({
    //         deleteClick: true
    //     });
    // }

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

                const isLiked = this.liked();

                if (isLiked) {
                    return (
                        <div className={styles.liked}>You voted for this employee.</div>
                    );
                }

                return (
                    <div className={styles.container}>
                        <Button text="Like" onClick={this.like} type="detail" />
                    </div>
                );
            }
            return (
                <div className={styles.button}>
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
                        <div className={styles.field}>Liked by: <i><b>{this.renderLikes()}</b></i></div>
                    </div>
                    <div className={styles.details}>
                        {/* Nominationed by: <i><b>{this.renderNominations()}</b></i> */}
                    </div>
                </div >

            </Container>
        )
    }
}

export default EmployeeDetailsPage;