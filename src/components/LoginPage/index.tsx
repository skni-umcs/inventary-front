import React, {useEffect, useState} from 'react';
import {Box, Button, Container, TextField, Typography} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ApiClient from "../../helpers/api-client";
import {toast} from "react-toastify";
import useStyles, {szopy} from "./loginPage.style";
import AuthClient from "../../helpers/auth-client";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bg, setBg] = useState('');
    const classes = useStyles();
    const login = (e: any) => {
        e.preventDefault();
        ApiClient.login(username, password).then((res: string) => {
            if (res.toLowerCase() == "unauthorized") {
                return;
            } else if (res.toLowerCase() == 'OK') {
                toast.success('Zalogowano!');
            }
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }).catch(err => {
            if (err.toString().toLowerCase().includes('unauthorized') || err.toString().toLowerCase().includes('422')) {
                toast.error("Niepoprawna nazwa użytkownika lub hasło");
                return;
            } else {
                console.log(err);
                toast.error("Wystąpił nieoczewiany błąd. Sprawdź konsolę deweloperską.");
            }
        });
    };

    useEffect(() => {
        setBg(szopy[Math.floor(Math.random() * szopy.length)]);
    }, [])

    return (
        <Container maxWidth={'lg'}>
            <Box marginTop={'60px'} maxWidth={'480px'} marginX={'auto'}>
                <Card>
                    <form>
                        <CardActionArea component={'div'}>
                            <CardMedia
                                component="img"
                                alt="Szop pracz"
                                height="240"
                                image={bg}
                                title="Obrazek tła"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Logowanie
                                </Typography>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <AccountCircleIcon style={{color: 'grey', marginRight: '8px'}}/>
                                    <TextField id={'username-input'}
                                               label={'Nazwa użytkownika'}
                                               variant={'standard'}
                                               type={'text'}
                                               onChange={e => setUsername(e.target.value)}
                                               fullWidth/>
                                </Box>

                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <LockIcon style={{color: 'grey', marginRight: '8px'}}/>
                                    <TextField id={'password-input'}
                                               label={'Hasło'}
                                               variant={'standard'}
                                               type={'password'}
                                               onChange={e => setPassword(e.target.value)}
                                               fullWidth/>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Box
                                sx={{display: 'flex', justifyContent: 'space-between', width: '96%', marginLeft: '2%'}}>
                                <Button size="small"
                                        color="primary"
                                        variant={'contained'}
                                        type={'submit'}
                                        onClick={login}>
                                    Zaloguj
                                </Button>
                                <Button size="small" color="primary">
                                    Nie pamiętasz hasła?
                                </Button>
                            </Box>
                        </CardActions>
                    </form>
                </Card>
            </Box>
        </Container>
    );
};

export default LoginPage;
