import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Employees from '../../components/employees'

const Publications = () => {

  return (
    <PageLayout>
      <Title title="All Employees" />
      <Employees />
    </PageLayout>
  )
}

export default Publications
