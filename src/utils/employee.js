const getEmployee = async () => {
  const promise = await fetch(`http://localhost:9999/api/employee`)
  const employees = await promise.json()
  return employees
}

export default getEmployee