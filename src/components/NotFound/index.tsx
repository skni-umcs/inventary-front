import React from 'react';
import {Box, Container, Typography} from "@material-ui/core";
import notfound from './404.jpeg';
const NotFound = () => {
    return (
        <>
            <Container maxWidth={'lg'}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Typography variant={'h1'}>404</Typography>
                    <Typography variant={'h2'}>Nie odnaleziono podstrony</Typography>
                    <img src={notfound} alt={'404'}/>
                </Box>
            </Container>
        </>
    );
}

export default NotFound;