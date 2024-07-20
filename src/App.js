import React from 'react';
import Home from './pages/Home';
import { Container, Box } from '@mui/material';

const App = () => {
    return (
        <Container maxWidth="lg" style={{marginTop: 50}}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Home />
            </Box>
        </Container>
    );
};

export default App;
