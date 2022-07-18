import React, {useEffect, useState} from 'react';
import {ItemModalType} from "./itemModal.type";
import {
    Container,
    Paper,
    Box,
    Typography,
    IconButton,
    Input,
    TextField,
    Button,
    Select,
    MenuItem, InputLabel, FormControl
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./itemModal.style";
import Draggable from 'react-draggable';
import IItem from "../../types/item.type";
import ApiClient from '../../helpers/api-client';
import TagInput from "./TagInput";
import emptyItem from "../../helpers/empty-item";
import {toast} from "react-toastify";

const ItemModal = (prop: ItemModalType) => {

    const [item, setItem] = useState<IItem>(emptyItem);

    const setItemValue = (prop: string, value: string | string[]) => {
        setItem(prev => {
            return {
                ...prev,
                [prop]: value
            }
        });
    }

    useEffect(() => {
        if(prop.itemId === undefined) return;
        ApiClient.getItemById(prop.itemId)
            .then(res => {
                try {
                    setItem(res);
                } catch(e) {
                    console.error(e)
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [prop.itemId]);

    const saveData = () => {
        ApiClient.updateItem(item)
            .then(res => {
                if(res.message === 'success') {
                    toast.success('Zapisano zmiany');
                    prop.closeModal();
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    const classes = useStyles();

    return (
        <Draggable handle={'#top-bar-handle'} cancel={'#top-bar-button'}>
            <Container className={classes.container} style={{display: prop.visible ? '' : 'none'}} maxWidth={'md'}>
                <Paper className={classes.container} elevation={2}>
                    <Box id={'top-bar-handle'} className={classes.topBar}>
                        <Typography variant={'h4'}>{item.name} [{prop.itemId}]</Typography>
                        <IconButton id={'top-bar-button'} className={classes.Btn} onClick={prop.closeModal}>
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
                                    value={item.name}
                                    onChange={e => setItemValue('name', e.target.value)}/>

                                <FormControl className={classes.textField}>
                                    <InputLabel className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Magazyn</InputLabel>
                                    <Select
                                        value={item.warehouse}
                                        onChange={e => setItemValue('warehouse', e.target.value as string)}
                                    >
                                        {prop.warehouses.map(warehouse => (
                                            <MenuItem key={warehouse} value={warehouse}>{warehouse}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box className={classes.infoContainer}>
                                <TextField
                                    className={classes.textField}
                                    label={'Wartość'}
                                    variant={'standard'}
                                    type={'text'}
                                    value={item.value}
                                    onChange={e => setItemValue('value', e.target.value)}/>

                                <FormControl className={classes.textField}>
                                    <InputLabel className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Kategoria</InputLabel>
                                    <Select
                                        value={item.category}
                                        onChange={e => setItemValue('category', e.target.value as string)}
                                    >
                                        {prop.categories.map(category => (
                                            <MenuItem key={category} value={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className={classes.row}>
                            <TagInput
                                tags={item.keywords}
                                setTags={e => setItemValue('keywords', e)}
                                textField={classes.textField}/>
                        </Box>
                        <Box className={classes.row} style={{display: 'flex',
                            flexDirection: 'column',
                            width: '90%',
                            alignItems: 'center',
                            justifyItems: 'center',
                            placeItems: 'flex-start',
                        }}>
                            <TextField
                                className={classes.textField}
                                label={'Opis'}
                                variant={'standard'}
                                type={'text'}
                                value={item.description}
                                multiline
                                maxRows={11}
                                minRows={4}
                                style={{width: '96%', margin: '0 2% 0 2%'}} //Bardzo dziwne rozwiązanie, ale działa
                                onChange={e => setItemValue('description', e.target.value)}/>
                        </Box>
                        <Box className={classes.footerRow}>
                            <Button variant={'contained'} color={'secondary'} onClick={prop.closeModal}>Odrzuć</Button>
                            <Button variant={'contained'} color={'primary'} style={{marginLeft: '12px'}} onClick={saveData}>Zatwierdź</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Draggable>
    );
}

export default ItemModal;