import React from 'react'
import stiles from './index.module.css'
import { Button } from 'react-dom'

const SubmitButton = ({ title, onClick }) => {
  return (
    <Button className={stiles.submit} type="submit" onClick={onClick}>{title}</Button>
  )
}

export default SubmitButton