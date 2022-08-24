import {
    Box,
    Button,
    Container,
    FormControl, FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select, Switch,
    TextField,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, {useEffect, useState} from 'react';
import Draggable from 'react-draggable';
import {toast} from 'react-toastify';
import ApiClient from '../../helpers/api-client';
import emptyItem from '../../helpers/empty-item';
import ItemType from '../../types/item.type';
import DescriptionEditor from '../DescriptionEditor';
import useStyles from './itemModal.style';
import {ItemModalType} from './itemModal.type';
import TagInput from './TagInput';

const ItemModal = (props: ItemModalType) => {

    const [item, setItem] = useState<ItemType>(emptyItem);
    const [tempValue, setTempValue] = useState<number>(0);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState(() => EditorState.createEmpty());

    const [isEditing, setIsEditing] = useState(false);

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
                    const contentBlock = htmlToDraft(res.description);
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        setItemDescription(editorState);
                    }
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
        data.description = draftToHtml(convertToRaw(itemDescription.getCurrentContent()));
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

    const setEditorState = (editorState: EditorState) => {
        setItemDescription(editorState);
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
                        width: '96%',
                        alignItems: 'center',
                        justifyItems: 'center',
                        placeItems: 'flex-start',
                    }}>
                        <Box style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}>
                            <FormControlLabel control={<Switch onClick={() => setIsEditing(!isEditing)}/>} label='Edytuj' />
                        </Box>
                        <DescriptionEditor editorState={itemDescription} isEditing={isEditing}
                                           setEditorState={setEditorState}/>
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