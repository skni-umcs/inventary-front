import React, {useState} from 'react';
import {Button, Container, createStyles, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import ApiClient from "../../helpers/api-client";
import AuthClient from '../../helpers/auth-client';
import {toast} from "react-toastify";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '50%',
            flexAlign: 'center',
            margin: 'auto',
        },
        header: {
            textAlign: 'center',
        },
        textField: {
            margin: theme.spacing(1),
        },
    }),
);
const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    const login = (e: any) => {
        e.preventDefault();
        console.log(username);
        ApiClient.login(username, password).then((res: string) => {
            toast(res);
            if(res.toLowerCase() == "unauthorized") {
                return;
            }
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }).catch(err => {
            console.log(err);
            toast("unauthorized");
        });
    };

    return (
        <Container maxWidth={'lg'}>
            <Typography variant={'h2'} className={classes.header}>
                Logowanie
            </Typography>
            <form id={'login-form'} className={classes.root}>
                <TextField
                    id={'login-email'}
                    label={'Email'}
                    type={'text'}
                    variant={'outlined'}
                    onChange={(e) => setUsername(e.target.value)}
                    className={classes.textField}
                    fullWidth
                    required
                />
                <TextField
                    id={'login-password'}
                    label={'Password'}
                    type={'password'}
                    variant={'outlined'}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.textField}
                    fullWidth
                    required
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    type={'submit'}
                    onClick={login}
                    fullWidth>
                Zaloguj </Button>
            </form>
        </Container>
    );
};

export default LoginPage;
