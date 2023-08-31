import {Box, Button, Container, TextField, Typography} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import ApiClient from '../../helpers/api-client';
import UserType from '../../types/user.type';
import {szopy} from '../LoginPage/loginPage.style';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [tokenDisabled, setTokenDisabled] = useState(false);

    const [bg, setBg] = useState('');

    const register = () => {
        const user: UserType = {
            username,
            password,
            password_repeat: confirmPassword,
            token,
            email,
            firstname: firstName,
            lastname: lastName,
        };
        if (user.password !== user.password_repeat) {
            toast.error('Wprowadzone hasła nie zgadzają się');
            return;
        }
        if (!user.password || user.password.length < 8) {
            toast.warning('Hasło musi mieć minimum 8 znaków');
            return;
        }
        ApiClient.register(user).then((res: any) => { // TODO add response type
            if (res.message.toLowerCase() === 'ok') {
                toast.success('Zarejestrowano!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 4000);
            } else {
                toast.warning('Wystąpił nieoczekiwany błąd');
            }
        }).catch(err => {
            toast.error('Wystąpił nieoczekiwany błąd');
            console.log(err);
        });
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const registerToken = urlParams.get('token');
        if (registerToken) {
            setToken(registerToken);
            setTokenDisabled(true);
            window.history.replaceState(null, '', '/register');
        }
        setBg(szopy[Math.floor(Math.random() * szopy.length)]);
    }, []);

    return (
        <Container maxWidth={'lg'}>
            <Box marginTop={'60px'} maxWidth={'480px'} marginX={'auto'}>
                <Card>
                    <form>
                        <CardActionArea component={'div'}>
                            <CardMedia
                                component='img'
                                alt='Szop pracz'
                                height='240'
                                image={bg}
                                title='Obrazek tła'
                            />
                            <CardContent>
                                <Typography gutterBottom={true} variant='h5' component='h2'>
                                    Rejestracja
                                </Typography>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <AccountCircleIcon style={{color: 'grey', marginRight: '8px'}}/>
                                    <TextField id={'username-input'}
                                               label={'Nazwa użytkownika'}
                                               variant={'standard'}
                                               type={'text'}
                                               value={username}
                                               onChange={e => setUsername(e.target.value)}
                                               fullWidth={true}/>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <AlternateEmailIcon style={{color: 'grey', marginRight: '8px'}}/>
                                    <TextField id={'email-input'}
                                               label={'Adres email'}
                                               variant={'standard'}
                                               type={'email'}
                                               value={email}
                                               onChange={e => setEmail(e.target.value)}
                                               fullWidth={true}/>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'flex-end',
                                    justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <Box sx={{display: 'flex', alignItems: 'flex-end',
                                        marginRight: '4px'}}>
                                        <PersonIcon style={{color: 'grey', marginRight: '8px'}}/>
                                        <TextField id={'firstName-input'}
                                                   label={'Imię'}
                                                   variant={'standard'}
                                                   type={'text'}
                                                   value={firstName}
                                                   onChange={e => setFirstName(e.target.value)}/>
                                    </Box>

                                    <Box sx={{display: 'flex', alignItems: 'flex-end',
                                        marginLeft: '4px'}}>
                                        <TextField id={'lastName-input'}
                                                   label={'Nazwisko'}
                                                   variant={'standard'}
                                                   type={'text'}
                                                   value={lastName}
                                                   onChange={e => setLastName(e.target.value)}/>
                                    </Box>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <LockIcon style={{color: 'grey', marginRight: '8px'}}/>
                                    <TextField id={'password-input'}
                                               label={'Hasło'}
                                               variant={'standard'}
                                               type={'password'}
                                               value={password}
                                               onChange={e => setPassword(e.target.value)}
                                               fullWidth={true}
                                               inputProps={{'data-private': ''}}/>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <EnhancedEncryptionIcon style={{color: 'grey', marginRight: '8px'}}/>
                                    <TextField id={'confirm-password-input'}
                                               label={'Potwierdź hasło'}
                                               variant={'standard'}
                                               type={'password'}
                                               value={confirmPassword}
                                               onChange={e => setConfirmPassword(e.target.value)}
                                               fullWidth={true}
                                               inputProps={{'data-private': ''}}/>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <VpnKeyIcon style={{color: 'grey', marginRight: '8px'}}/>
                                    <TextField id={'token-input'}
                                               label={'Token zaproszenia'}
                                               variant={'standard'}
                                               type={'text'}
                                               disabled={tokenDisabled}
                                               value={token}
                                               onChange={e => setToken(e.target.value)}
                                               fullWidth={true}
                                               inputProps={{'data-private': ''}}/>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Box
                                sx={{display: 'flex', justifyContent: 'space-between', width: '96%', marginLeft: '2%'}}>
                                <Button size='small'
                                        color='primary'
                                        variant={'contained'}
                                        onClick={register}>
                                    Zarejestruj
                                </Button>
                                <Button size='small' color='primary' onClick={() => window.location.href = '/'}>
                                    Chcesz się zalogować?
                                </Button>
                            </Box>
                        </CardActions>
                    </form>
                </Card>
            </Box>
        </Container>
    );
};

export default RegisterPage;
