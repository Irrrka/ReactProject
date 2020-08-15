import React, { useState, useCallback, useEffect, useMemo, useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import Employee from '../employee'
import getEmployee from '../../utils/employee'


const Emplayees = (props) => {
  const context = useContext(UserContext)
  const [employees, setEmployees] = useState(context.employees || [])

  const getEmployees = useCallback(async () => {
    const employees = await getEmployee()
    setEmployees(employees)
  }, [])

  const renderEmployees = useMemo(() => {
    return employees.map((employee, index) => {
      return (
        <Employee key={employee._id} index={index} position={employee.position} name={employee.name}  {...employee} />
      )
    })
  }, [employees])

  useEffect(() => {
    getEmployees()
  }, [props.updatedEmployees, getEmployees])

  return (
    <div className={styles.wrapper}>
      {renderEmployees}
    </div>
  )
}

export default Emplayees
