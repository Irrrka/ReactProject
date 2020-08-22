import React from 'react';
import Container from '../../components/container'
import About from '../../components/about';
import Employees from '../employee/all';

const HomePage = () => {
      return (
        <Container>
          <About/>
          <Employees />
        </Container>
      );
}

export default HomePage;
