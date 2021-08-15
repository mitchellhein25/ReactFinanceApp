import React from 'react';
import { Container } from '@material-ui/core';

import Authentication from '../components/Authentication/Authentication'

function Auth() {
    

    return (
        <Container maxWidth="none">
            <Authentication></Authentication>
        </Container>
    );
}

export default Auth;