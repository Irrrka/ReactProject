import React, { Component, useContext, useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Employees from '../../components/employees';
import UserContext from '../../Context';

const ProfilePage = (props) => {

    const id = match.params.userId;
    const[email, setEmail] = useState(null);
    const[votes, setVotes] = useState(null);
    const context = useContext(UserContext);
    const params = useParams();
    const history = useHistory();

    const getData = useCallback(async () => {
        const response = await fetch(`http://localhost:9999/api/user?id=${id}`);
        if(!response.ok){
            history.push('/error');
        }
        const user = await response.json();
        setEmail = user.email;
        setVotes = user.votes && user.votes.length;
    },[params.userId, history]);

    logout = () => {
        context.logout();
        history.push('/');
    }

    useEffect(() => {
        getData();
    }, [getData])

    if(!email){
        return(
            <PageLayout>
                <div>Loading...</div>
            </PageLayout>
        )
    }
    return (
        <PageLayout>
            <div>
                <p>User: {email}</p>
                <p>Votes: {votes}</p>
                <button onClick={logout}>Logout</button>>
            </div>
            <Employees length={3}/>
        </PageLayout>
    )
}


// class ProfilePage extends Component {

//     constructor(props){
//         super(props)

//         this.state = {
//             username:null,
//             votes:null,
//         }
//     }
// componentDidMount(){
//     this.getUser(this.props.params.params.userId)
// }

// getUser = async (id) => {
//     const promise = await fetch(`http://localhost:9999/api/user?id=${id}`);
//     if(!promise.ok){
//         this.props.history.push('/error');
//     }
//     const user = await promise.json();

//     console.log(user);
//     this.setState({
//         username:user.username,
//         votes:user.votes && user.votes.length
//     })
// }

// static contextType = UserContext;

// logout = () => {
//     this.context.logout();
//     this.props.history.push('/');
// }


//     render() {
//         const {
//             username,
//             votes
//         } = this.state;

//         if(!username){
//             return(
//                 <PageLayout>
//                     <div>Loading...</div>
//                 </PageLayout>
//             )
//         }
//         return (
//             <PageLayout>
//                 <div>
//                     <p>User: {username}</p>
//                     <p>Votes: {votes}</p>
//                     <button onClick={this.logout}>Logout</button>>
//                 </div>
//                 <Employees length={3}/>
//             </PageLayout>
//         )
//     }
// }

export default PageLayout