// import React, { useState } from 'react'
// import PageLayout from '../../components/page-layout'
// import Title from '../../components/title'
// import Employees from '../../components/employees'
// import SubmitButton from '../../components/button'
// import getCookie from '../../utils/cookie'

// const CreateEmployeePage = () => {
//   const [name, setName] = useState('')
//   const [position, setPosition] = useState('')
//   const [updatedEmployees, setUpdatedEmployees] = useState([])

//   const handleSubmit = async () => {
//     await fetch('http://localhost:9999/api/employee', {
//       method: 'POST',
//       body: JSON.stringify({
//         name: name,
//         position: position
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': getCookie('x-auth-token')
//       }
//     })

//     setEmployees('')
//     setUpdatedEmployees([...updatedEmployees, 1])
//   }

//   return (
//     <PageLayout>
//       <Title title="Share your thoughts..." />
//       <Container>
//         <div>
//           <TextArea value={publication} onChange={e => setPublication(e.target.value)} />
//         </div>
//         <div>
//           <SubmitButton title="Post" onClick={handleSubmit} />
//         </div>
//       </Container>
      
//       <Origamis length={3} updatedOrigami={updatedOrigami} />

//     </PageLayout>
//   )
// }

// export default CreateEmployeePage