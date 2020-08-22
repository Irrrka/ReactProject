import React from 'react';
import Error from '../../components/error';
import Container from '../../components/container';

const ErrorPage = () => {

    return (
        <Container>
            <Error text="Error Page. Something went wrong!" />
        </Container>
    );
}

export default ErrorPage;