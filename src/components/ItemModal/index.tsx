import React, {useState} from 'react';
import {ItemModalType} from "./itemModal.type";
import {Container, Paper, Box, Typography, IconButton, Input, TextField} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./itemModal.style";
import Draggable from 'react-draggable';
import IItem from "../../types/item.type";

const ItemModal = (param: ItemModalType) => {

    const [item, setItem] = useState<IItem>();

    const setItemValue = (prop: string, value: string | string[]) => {
        let tItem = item;
        //@ts-ignore
        tItem[prop] = value;
        setItem(tItem);
    }

    const classes = useStyles();

    return (
        <Draggable handle={'#top-bar-handle'} cancel={'#top-bar-button'}>
            <Container className={classes.container} style={{display: param.visible ? '' : 'none'}} maxWidth={'md'}>
                <Paper className={classes.container} elevation={2}>
                    <Box id={'top-bar-handle'} className={classes.topBar}>
                        <Typography variant={'h4'}>{param.itemId}</Typography>
                        <IconButton id={'top-bar-button'} className={classes.Btn} onClick={param.closeModal}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Box className={classes.mainContainer}>
                        <Box className={classes.row}>
                            <Typography className={classes.centered} variant={'h5'}>Edytuj informacje</Typography>
                        </Box>
                        <Box className={classes.row}>
                            <Box className={classes.infoContainer}>
                                <TextField
                                    className={classes.textField}
                                    label={'Nazwa przedmiotu'}
                                    variant={'standard'}
                                    type={'text'}
                                    onChange={e => setItemValue('name', e.target.value)}/>
                                <TextField
                                    className={classes.textField}
                                    label={'Kategoria'}
                                    variant={'standard'}
                                    type={'text'}
                                    onChange={e => setItemValue('category', e.target.value)}/>
                                <TextField
                                    className={classes.textField}
                                    label={'Wartość'}
                                    variant={'standard'}
                                    type={'text'}
                                    onChange={e => setItemValue('value', e.target.value)}/>
                            </Box>
                            <Box className={classes.infoContainer}>
                                <TextField
                                    className={classes.textField}
                                    label={'Magazyn'}
                                    variant={'standard'}
                                    type={'text'}
                                    onChange={e => setItemValue('warehouse', e.target.value)}/>
                                <TextField
                                    className={classes.textField}
                                    label={'Opis'}
                                    variant={'standard'}
                                    type={'text'}
                                    onChange={e => setItemValue('description', e.target.value)}/>
                                <TextField
                                    className={classes.textField}
                                    label={'Słowa kluczowe'}
                                    variant={'standard'}
                                    type={'text'}
                                    onChange={e => setItemValue('keywords', e.target.value.split(','))}/>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Draggable>
    );
}

export default ItemModal;