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
    MenuItem, InputLabel
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./itemModal.style";
import Draggable from 'react-draggable';
import IItem from "../../types/item.type";
import ApiClient from '../../helpers/api-client';
import TagInput from "./TagInput";

const ItemModal = (prop: ItemModalType) => {

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

    const [categories, setCategories] = useState<string[]>([]);

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
        console.log(item);
    }, [prop.itemId]);

    useEffect(() => {
        ApiClient.getCategories()
            .then(res => {
                let output=[];
                for(let item of res){
                    output.push(item.name);
                }
                setCategories(output);
            })
            .catch(err => {
                console.error(err);
            }
            );
    }, []);

    const saveData = () => {
        ApiClient.updateItem(item)
            .then(res => {
                console.log(res);
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
                                <TextField
                                    className={classes.textField}
                                    label={'Magazyn'}
                                    variant={'standard'}
                                    type={'text'}
                                    value={item.warehouse}
                                    onChange={e => setItemValue('warehouse', e.target.value)}/>

                            </Box>
                            <Box className={classes.infoContainer}>
                                <InputLabel >Kategoria</InputLabel>
                                <Select
                                    className={classes.textField}
                                    labelId="demo-simple-select-label"
                                    value={item.category}
                                    onChange={e => setItemValue('category', e.target.value as string)}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    ))}
                                </Select>

                                <TextField
                                    className={classes.textField}
                                    label={'Wartość'}
                                    variant={'standard'}
                                    type={'text'}
                                    value={item.value}
                                    onChange={e => setItemValue('value', e.target.value)}/>
                            </Box>
                        </Box>
                        <Box className={classes.row}>
                            <TagInput
                                tags={item.keywords}
                                setTags={e => setItemValue('keywords', e)}
                                textField={classes.textField}/>
                        </Box>
                        <Box className={classes.row} style={{margin: '2%'}}>
                            <TextField
                                className={classes.textField}
                                label={'Opis'}
                                variant={'standard'}
                                type={'text'}
                                value={item.description}
                                multiline
                                maxRows={11}
                                minRows={4}
                                style={{width: '90%'}}
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