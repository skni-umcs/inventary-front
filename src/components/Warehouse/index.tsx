import TableBody from './TableBody';
import TableHeader from './TableHeader';
import React, {useEffect, useState} from "react";
import IItem from "../../types/item.type";
import {DataGrid, GridColDef, GridRowParams, GridSelectionModel} from '@material-ui/data-grid';
import ApiClient from "../../helpers/api-client";
import ItemModal from "../ItemModal";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, InputLabel, MenuItem, Select,
    TextField,
    Typography
} from "@material-ui/core";
import MenuDrawer from "../MenuDrawer";
import TagInput from "../ItemModal/TagInput";
import useStyles from "../ItemModal/itemModal.style";
import emptyItem from "../../helpers/empty-item";
import {toast} from "react-toastify";

interface ItemTableProps {
    drawerOpen: boolean,
    drawerOnClose: () => void,
}

const ItemsTable = (props: ItemTableProps) => {
    const [items, setItems] = useState<IItem[]>([]);

    const [itemModalVisible, setItemModalVisible] = useState(false);
    const [itemId, setItemId] = useState<number | undefined>(undefined);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [addItemVisible, setAddItemVisible] = useState(false);

    const [selectedItem, setSelectedItems] = useState<GridSelectionModel>([]);

    const [categories, setCategories] = useState<string[]>([]);
    const [warehouses, setWarehouses] = useState<string[]>([]);

    const [newItem, setNewItem] = useState<IItem>(emptyItem);

    const classes = useStyles();


    const cols: GridColDef[] = [
        {field: 'name', headerName: 'Nazwa', width: 350},
        {field: 'category', headerName: 'Kategoria', width: 250},
        {field: 'value', headerName: 'Wartość', width: 150},
        {field: 'warehouse', headerName: 'Magazyn', width: 250}
    ];

    const getAllItems = () => {
        ApiClient.getItems(99999, 0)
            .then(res => {
                setItems(res);
            })
            .catch(err => {
                console.error(err);
            }
            );
    }

    useEffect(() => {
        getAllItems();
    }, []);

    const openItemModal = (row: GridRowParams) => {
        setItemModalVisible(true);
        setItemId(row.id as number);
    }

    const closeItemModal = () => {
        getAllItems();
        setItemModalVisible(false);
        setItemId(undefined);
    }

    const deleteItems = () => {
        ApiClient.deleteItems(selectedItem as number[])
            .catch((err: any) => {
                console.error(err);
            }).finally(() => {
                setSelectedItems([]);
                setDialogVisible(false);
                window.location.href = '/'
            }
        );
    }

    const openDialog = () => {
        if(selectedItem.length === 0) return;
        setDialogVisible(true);
    }

    const openAddDialog = () => {
        setAddItemVisible(true);
    }

    const setItemValue = (prop: string, value: string | string[]) => {
        setNewItem(prev => {
            return {
                ...prev,
                [prop]: value
            }
        });
    }

    const addItem = () => {
        ApiClient.addItem(newItem)
            .then(res => {
                if(res.message === 'success'){
                    setAddItemVisible(false);
                    setNewItem(emptyItem);
                    getAllItems();
                    props.drawerOnClose();
                    toast.success('Dodano nowy element');
                }
            })
            .catch((err: any) => {
                console.error(err);
                toast.error('Nie udało się dodać nowego elementu');
            });
    }

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
            });

        ApiClient.getStorages()
            .then(res => {
                let output=[];
                for(let item of res){
                    output.push(item.name);
                }
                setWarehouses(output);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <MenuDrawer open={props.drawerOpen} onClose={props.drawerOnClose} openDeleteDialog={openDialog} openAddDialog={openAddDialog}/>
            <Dialog
                maxWidth="xs"
                aria-labelledby="add-title"
                open={addItemVisible}
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
                                value={newItem.name}
                                onChange={e => setItemValue('name', e.target.value)}/>

                            <FormControl className={classes.textFieldW}>
                                <InputLabel className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Magazyn</InputLabel>
                                <Select
                                    value={newItem.warehouse}
                                    onChange={e => setItemValue('warehouse', e.target.value as string)}
                                >
                                    {warehouses.map(warehouse => (
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
                                value={newItem.value}
                                onChange={e => setItemValue('value', e.target.value)}/>

                            <FormControl className={classes.textFieldW}>
                                <InputLabel className={'MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'}>Kategoria</InputLabel>
                                <Select
                                    value={newItem.category}
                                    onChange={e => setItemValue('category', e.target.value as string)}
                                >
                                    {categories.map(category => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={classes.row}>
                        <TagInput
                            tags={newItem.keywords}
                            setTags={e => setItemValue('keywords', e)}
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
                            value={newItem.description}
                            multiline
                            maxRows={11}
                            minRows={4}
                            style={{width: '96%', margin: '0 2% 0 2%'}} //Bardzo dziwne rozwiązanie, ale działa
                            onChange={e => setItemValue('description', e.target.value)}/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={e => setAddItemVisible(false)} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={addItem} color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                maxWidth="xs"
                aria-labelledby="delete-title"
                open={dialogVisible}
            >
                <DialogTitle id="delete-title">Usuń elementy</DialogTitle>
                <DialogContent dividers>
                    <Typography variant={'subtitle2'} component={'h5'}>Czy na pewno chcesz usunąć wybrane elementy?</Typography>
                    <ol>
                        {selectedItem.map((item) => {
                            return <Typography variant={'subtitle1'} component={'h6'}><li>{items.find((i: IItem) => i.id === item)?.name}</li></Typography>;
                        })}
                    </ol>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={e => setDialogVisible(false)} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={deleteItems} color="primary">
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>
            <ItemModal visible={itemModalVisible} itemId={itemId} closeModal={closeItemModal}/>
            <DataGrid
                rows={items}
                columns={cols}
                onRowDoubleClick={e => openItemModal(e)}
                checkboxSelection={true}
                disableSelectionOnClick={true}
                onSelectionModelChange={e => setSelectedItems(e)}
            />
        </>
    );
}

export {
    TableBody,
    TableHeader,
    ItemsTable
};