// const authenticate = async (url, body, onSuccess, onFailure) => {
//     try {
//       const promise = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       const token = promise.headers.get('auth');
//       document.cookie = `x-auth-token=${token}`;
  
//       const response = await promise.json()
  
//       if (response.username && token) {
//         onSuccess({
//           username: response.username,
//           id: response._id,
//           employees: response.employees,
//         })
//       } else {
//         onFailure()
//       }
//     } catch(e) {
//       onFailure(e)
//     }
//   }
  
  
//   export default authenticate

// // fetch('http://localhost:9999/api/user/login', {
// //             method: 'POST',
// //             body: JSON.stringify({
// //                 username,
// //                 password
// //             }),
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             }
// //         }).then(response => {
// //             const token = response.headers.get('auth');
// //             if (token) {
// //                 document.cookie = `x-auth-token=${token}`;
// //             } else {
// //                 this.setState({
// //                     errors: ['Unauthorized']
// //                 })
// //             }
// //             return response.json();
// //         }).then(result => {
// //             if (result.username) {
// //                 const user = {
// //                     _id: result._id,
// //                     username: result.username,
// //                     employees: result.employees,
// //                 };
// //                 this.context.login(user);
// //                 this.props.history.push('/');
// //             }
// //         })