import {alpha, AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }),
);


interface NavbarProps {
    openDrawer: () => void;
}

const Navbar = (props: NavbarProps) => {

    const classes = useStyles();

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='open drawer'
                        onClick={props.openDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant='h6' noWrap={true}>
                        <Link style={{color: 'white', textDecoration: 'none'}} to={'/'}>
                            Inwentaryzacja
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
