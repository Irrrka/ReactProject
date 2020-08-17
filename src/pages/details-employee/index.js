import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import styles from './index.module.css';
import Title from '../../components/title';
import Button from '../../components/button';
import UserContext from '../../Context';
import getCookie from '../../utils/cookie';

class EmployeeDetailsPage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            position: '',
            opinion: '',
            createdBy: '',
            deleteClick: false,
            likes: []
        }
    }

    likedOrNot = () => {
        const {
            likes
        } = this.state;

        const {
            username
        } = this.context.user;

        let likedAlready = false;

        likes.forEach(like => {
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
            likes
        } = this.state;

        if (likes.length === 0) {
            return (
                <div className={styles.likes}>No collegues are voted yet!</div>
            )
        }

        let moreLikes = '';

        if (likes.length > 1) {
            moreLikes = ` and ${likes.length - 1} more.`;
        }

        return (
            likes.reverse().slice(0, 1).map((like) => {
                return (
                    <p key={like._id} className={styles.likes}>{like.username}{moreLikes}</p>
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

    edit = () => {
        this.props.history.push(`/edit/${this.props.match.params.id}`)
    }

    delete = () => {
        this.setState({
            deleteClick: true
        });
    }

    deleteConfirmed = () => {
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
            deleteClick
        } = this.state;

        if (this.context.logged) {
            const {
                username
            } = this.context.user;

            if (createdBy.username !== username) {

                const likedAlready = this.likedOrNot();

                if (likedAlready) {
                    return (
                        <div className={styles.liked}>You voted for this employee.</div>
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
                    {deleteClick
                        ?
                        <Button text="Click again" onClick={this.deleteConfirmed} type="detail" />
                        :
                        <Button text="Delete" onClick={this.delete} type="detail" />}
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
            opinion,
            createdBy
        } = this.state;

        return (
            <PageLayout>
                <Title text="Employee" />
               
                < div className={styles[`book-container`]} >

                    <div className={styles['img-container']}>
                        {/* <img className={styles[`book-cover`]} src={imageUrl} alt="Book" /> */}
                    </div>

                    <div className={styles['data-container']}>
                        <h1>{name}</h1>
                        <div className={styles.likes}>Liked by: {this.renderLikes()}</div>
                        <div className={styles['detail-buttons']}>{this.renderButtons()}</div>
                        <div className={styles.field}>Posted by: {createdBy.username}</div>
                        <div className={styles.field}>Email: {email}</div>
                        <div className={styles.field}>Position: {position}</div>
                    </div>
                </div >

            </PageLayout>
        )
    }
}

export default EmployeeDetailsPage;