import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, {useEffect, useState} from 'react';
import Draggable from 'react-draggable';
import {toast} from 'react-toastify';
import ApiClient from '../../helpers/api-client';
import emptyItem from '../../helpers/empty-item';
import ItemType from '../../types/item.type';
import useStyles from './itemModal.style';
import {ItemModalType} from './itemModal.type';
import TagInput from './TagInput';

const ItemModal = (props: ItemModalType) => {

    const [item, setItem] = useState<ItemType>(emptyItem);
    const [tempValue, setTempValue] = useState<number>(0);
    const [itemName, setItemName] = useState('');

    const setItemValue = (property: string, value: string | string[]) => {
        setItem(prev => {
            return {
                ...prev,
                [property]: value,
            };
        });
    };

    useEffect(() => {
        if (props.itemId === undefined) { return; }
        ApiClient.getItemById(props.itemId)
            .then(res => {
                try {
                    setItem(res);
                    setItemName(res.name);
                    setTempValue(res.value / 100);
                } catch (e) {
                    console.error(e);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [props.itemId]);

    const saveData = () => {
        const data = item;
        data.value = (tempValue * 100).toString();
        ApiClient.updateItem(data)
            .then(res => {
                if (res.message === 'success') {
                    toast.success('Zapisano zmiany');
                    props.closeModal();
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    const classes = useStyles();

    return (
        <Draggable handle={'#top-bar-handle'} cancel={'#top-bar-button'}
                   onMouseDown={() => props.onClick('item-modal-container')}>
            <div id='item-modal-container' className={classes.container}
                 style={{display: props.visible ? '' : 'none'}}>
                <Box id={'top-bar-handle'} className={classes.topBar}>
                    <Typography variant={'h4'} style={{userSelect: 'none'}}>{itemName}</Typography>
                    <IconButton id={'top-bar-button'} onClick={props.closeModal}>
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
                                <InputLabel
                                    className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Magazyn</InputLabel>
                                <Select
                                    value={item.warehouse}
                                    onChange={e => setItemValue('warehouse', e.target.value as string)}
                                >
                                    {props.warehouses.map(warehouse => (
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
                                type={'number'}
                                value={tempValue}
                                onChange={e => setTempValue(parseFloat(e.target.value))}/>

                            <FormControl className={classes.textField}>
                                <InputLabel
                                    className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Kategoria</InputLabel>
                                <Select
                                    value={item.category}
                                    onChange={e => setItemValue('category', e.target.value as string)}
                                >
                                    {props.categories.map(category => (
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
                    <Box className={classes.row} style={{
                        display: 'flex',
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
                            multiline={true}
                            maxRows={4}
                            minRows={4}
                            inputProps={{maxLength: 250}}
                            style={{width: '96%', margin: '0 2% 0 2%'}} // Bardzo dziwne rozwiązanie, ale działa
                            onChange={e => setItemValue('description', e.target.value)}/>
                    </Box>
                    <Box className={classes.footerRow}>
                        <Button variant={'contained'} color={'secondary'} onClick={props.closeModal}>Odrzuć</Button>
                        <Button variant={'contained'} color={'primary'} style={{marginLeft: '12px'}}
                                onClick={saveData}>Zatwierdź</Button>
                    </Box>
                </Box>
            </div>
        </Draggable>
    );
};

export default ItemModal;