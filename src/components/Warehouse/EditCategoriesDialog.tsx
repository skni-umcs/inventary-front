import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import ApiClient from '../../helpers/api-client';
import DialogType from './dialog.type';

interface EditCategoriesDialogProps extends DialogType {
    closeDialog: () => void;
}

interface Category {
    id: number;
    name: string;
}

const EditCategoriesDialog = (props: EditCategoriesDialogProps) => {

    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        ApiClient.getCategories()
            .then(res => {
                setCategories(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteSelectedCategory = () => {
        ApiClient.deleteCategory(selectedCategory)
            .then(res => {
                if (res.message === 'success') {
                    toast.success('Usunięto kategorie');
                    getCategories();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const addNewCategory = () => {
        ApiClient.addCategory(newName)
            .then(res => {
                if (res.message === 'success') {
                    toast.success('Dodano kategorie');
                    getCategories();
                    setNewName('');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const editCategory = () => {
        const data = {
            id: selectedCategory,
            name: newName,
        };
        ApiClient.editCategory(data)
            .then(res => {
                if (res.message === 'success') {
                    toast.success('Zmieniono nazwe kategorii');
                    getCategories();
                    setNewName('');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Dialog
            maxWidth='sm'
            aria-labelledby='delete-title'
            open={props.dialogVisible}
        >
            <DialogTitle id='delete-title'>Edytuj kategorie</DialogTitle>
            <DialogContent dividers={true}>
                <FormControl style={{width: '100%'}}>
                    <InputLabel
                        className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Kategoria</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value as number)}
                    >
                        {categories.map(category => (
                            <MenuItem key={category.name} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box style={{marginTop: '10px'}}>
                    <TextField onChange={e => setNewName(e.target.value)} value={newName}
                               label={'Nazwa nowej kategorii'} variant={'standard'} type={'text'}/>
                </Box>
                <Box style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '12px'}}>
                    <Button color={'primary'} variant={'contained'} onClick={addNewCategory}>Dodaj</Button>
                    <Button color={'primary'} variant={'contained'} onClick={editCategory}>Edytuj</Button>
                    <Button color={'secondary'} variant={'contained'} onClick={deleteSelectedCategory}>Usuń</Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color='primary'>
                    Zamknij
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategoriesDialog;