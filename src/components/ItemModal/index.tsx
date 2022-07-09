import React, {useEffect, useState} from 'react';
import {ItemModalType} from "./itemModal.type";
import {Container, Paper, Box, Typography, IconButton, Input, TextField, Button} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./itemModal.style";
import Draggable from 'react-draggable';
import IItem from "../../types/item.type";
import ApiClient from '../../helpers/api-client';

const ItemModal = (param: ItemModalType) => {

    const [item, setItem] = useState<IItem>(
        {
            id: -1,
            name: '',
            category: '',
            value: '',
            warehouse: '',
            description: '',
            keywords: []
        }
    );

    const setItemValue = (prop: string, value: string | string[]) => {
        let tItem: IItem = item;
        tItem[prop] = value;
        setItem(tItem);
    }

    useEffect(() => {
        if(param.itemId === undefined) return;
        ApiClient.getItemById(param.itemId)
            .then(res => {
                try {
                    setItem(res.data)
                } catch(e) {
                    console.error(e)
                }
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

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
                        <Box className={classes.footerRow}>
                            <Button variant={'contained'} color={'secondary'}>Odrzuć</Button>
                            <Button variant={'contained'} color={'primary'} style={{marginLeft: '12px'}}>Zatwierdź</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Draggable>
    );
}

export default ItemModal;