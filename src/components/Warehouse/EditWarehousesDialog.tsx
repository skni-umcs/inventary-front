import React, {useEffect, useState} from "react";
import DialogType from "./dialog.type";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    InputLabel, MenuItem,
    Select, TextField,
    Typography
} from "@material-ui/core";
import ApiClient from "../../helpers/api-client";
import {toast} from "react-toastify";

interface EditWarehousesDialogProps extends DialogType {
    closeDialog: () => void,
}

interface Warehouse {
    id: number,
    name: string,
}

const EditWarehousesDialog = (props: EditWarehousesDialogProps) => {

    const [selectedWarehouse, setSelectedWarehouse] = useState(-1);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        getStorages();
    }, []);

    const getStorages = () => {
        ApiClient.getStorages()
            .then(res => {
                setWarehouses(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const deleteSelectedWarehouse = () => {
        ApiClient.deleteStorage(selectedWarehouse)
            .then(res => {
                if(res.message === 'success') {
                    toast.success('Usunięto magazyn');
                    getStorages();
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const addNewWarehouse = () => {
        ApiClient.addStorage(newName)
            .then(res => {
                if(res.message === 'success') {
                    toast.success('Dodano magazyn');
                    getStorages();
                    setNewName('');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const editWarehouse = () => {
        let data = {
            id: selectedWarehouse,
            name: newName
        }
        ApiClient.editStorage(data)
            .then(res => {
                if(res.message === 'success') {
                    toast.success('Zmieniono magazyn');
                    getStorages();
                    setNewName('');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Dialog
            maxWidth="xs"
            aria-labelledby="delete-title"
            open={props.dialogVisible}
        >
            <DialogTitle id="delete-title">Edytuj magazyny</DialogTitle>
            <DialogContent dividers>
                <FormControl style={{width: '100%'}}>
                    <InputLabel className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Magazyn</InputLabel>
                    <Select
                        value={selectedWarehouse}
                        onChange={e => setSelectedWarehouse(e.target.value as number)}
                    >
                        {warehouses.map(warehouse => (
                            <MenuItem key={warehouse.name} value={warehouse.id}>{warehouse.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box style={{marginTop: '10px'}}>
                <TextField onChange={e => setNewName(e.target.value)} value={newName} label={'Nazwa nowego magazynu'} variant={'standard'} type={'text'}/>
                </Box>
                <Box style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '12px'}}>
                    <Button color={'primary'} variant={'contained'} onClick={addNewWarehouse}>Dodaj</Button>
                    <Button color={'primary'} variant={'contained'} onClick={editWarehouse}>Edytuj</Button>
                    <Button color={'secondary'} variant={'contained'} onClick={deleteSelectedWarehouse}>Usuń</Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Zamknij
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditWarehousesDialog;