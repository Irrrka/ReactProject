import fetch from 'node-fetch'

const getEmployees = async (req, res, next) => {
  const promise = await fetch(`http://localhost:9000/api/employee`)
  const employees = await promise.json()
  req.employees = employees
  
  next()
}

export default getEmployees