import React from "react";
import {
    Box, Button, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import TagInput from "../ItemModal/TagInput";
import DialogType from "./dialog.type";
import useStyles from "../ItemModal/itemModal.style";
import IItem from "../../types/item.type";


interface AddItemDialogProps extends DialogType {
    newItem: IItem,
    setItemValue: (prop: string, value: string | string[]) => void,
    warehouses: string[],
    categories: string[],
    setAddItemVisible: (visible: boolean) => void,
    addItem: () => void,
}

const AddItemDialog = (props: AddItemDialogProps) => {
    const classes = useStyles();
    return (
        <Dialog
            maxWidth="xs"
            aria-labelledby="add-title"
            open={props.dialogVisible}
        >
            <DialogTitle id="add-title">Dodaj element</DialogTitle>
            <DialogContent dividers>
                <Typography variant={'subtitle2'} component={'h5'}>Wprowadź informacje aby zapisać je do rejestru</Typography>
                <Box className={classes.row}>
                    <Box className={classes.infoContainer}>
                        <TextField
                            className={classes.textFieldW}
                            label={'Nazwa przedmiotu'}
                            variant={'standard'}
                            type={'text'}
                            value={props.newItem.name}
                            onChange={e => props.setItemValue('name', e.target.value)}/>

                        <FormControl className={classes.textFieldW}>
                            <InputLabel className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Magazyn</InputLabel>
                            <Select
                                value={props.newItem.warehouse}
                                onChange={e => props.setItemValue('warehouse', e.target.value as string)}
                            >
                                {props.warehouses.map(warehouse => (
                                    <MenuItem key={warehouse} value={warehouse}>{warehouse}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className={classes.infoContainer}>
                        <TextField
                            className={classes.textFieldW}
                            label={'Wartość'}
                            variant={'standard'}
                            type={'text'}
                            value={props.newItem.value}
                            onChange={e => props.setItemValue('value', e.target.value)}/>

                        <FormControl className={classes.textFieldW}>
                            <InputLabel className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Kategoria</InputLabel>
                            <Select
                                value={props.newItem.category}
                                onChange={e => props.setItemValue('category', e.target.value as string)}
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
                        tags={props.newItem.keywords}
                        setTags={e => props.setItemValue('keywords', e)}
                        textField={classes.textFieldW}/>
                </Box>
                <Box className={classes.row} style={{display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                    alignItems: 'center',
                    justifyItems: 'center',
                    placeItems: 'flex-start',
                }}>
                    <TextField
                        className={classes.textFieldW}
                        label={'Opis'}
                        variant={'standard'}
                        type={'text'}
                        value={props.newItem.description}
                        multiline
                        maxRows={11}
                        minRows={4}
                        style={{width: '96%', margin: '0 2% 0 2%'}} //Bardzo dziwne rozwiązanie, ale działa
                        onChange={e => props.setItemValue('description', e.target.value)}/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={e => props.setAddItemVisible(false)} color="primary">
                    Anuluj
                </Button>
                <Button onClick={props.addItem} color="primary">
                    Dodaj
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddItemDialog;