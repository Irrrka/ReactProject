const getVote = async (length) => {
    const promise = await fetch(`http://localhost:9999/api/employee?length=${length}`)
    const employees = await promise.json()
    return employees
  }
  
  export default getVote