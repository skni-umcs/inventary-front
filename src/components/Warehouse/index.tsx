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
import AddItemDialog from "./AddItemDialog";
import DeleteItemDialog from "./DeleteItemDialog";
import EditWarehousesDialog from "./EditWarehousesDialog";
import EditCategoriesDialog from "./EditCategoriesDialog";

interface ItemTableProps {
    drawerOpen: boolean,
    drawerOnClose: () => void,
    categories: string[],
    warehouses: string[],
}

const ItemsTable = (props: ItemTableProps) => {
    const [items, setItems] = useState<IItem[]>([]);

    const [itemModalVisible, setItemModalVisible] = useState(false);
    const [itemId, setItemId] = useState<number | undefined>(undefined);

    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [addItemVisible, setAddItemVisible] = useState(false);
    const [editWarehouseVisible, setEditWarehouseVisible] = useState(false);
    const [editCategoriesVisible, setEditCategoriesVisible] = useState(false);


    const [selectedItem, setSelectedItems] = useState<GridSelectionModel>([]);

    const [newItem, setNewItem] = useState<IItem>(emptyItem);



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
        ApiClient.deleteItems(selectedItem as number[], 0);
        getAllItems();
        setDeleteDialogVisible(false);
    }

    const openDialog = () => {
        if(selectedItem.length === 0) return;
        setDeleteDialogVisible(true);
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

    const openEditWarehouseDialog = () => setEditWarehouseVisible(true);
    const closeEditWarehouseDialog = () => setEditWarehouseVisible(false);
    const openEditCategoriesDialog = () => setEditCategoriesVisible(true);
    const closeEditCategoriesDialog = () => setEditCategoriesVisible(false);


    return (
        <>
            <MenuDrawer open={props.drawerOpen} onClose={props.drawerOnClose} openDeleteDialog={openDialog} openAddDialog={openAddDialog} openEditWarehouseDialog={openEditWarehouseDialog} openEditCategoryDialog={openEditCategoriesDialog}/>
            <AddItemDialog newItem={newItem} setItemValue={setItemValue} warehouses={props.warehouses} categories={props.categories} setAddItemVisible={setAddItemVisible} addItem={addItem} dialogVisible={addItemVisible} />
            <DeleteItemDialog selectedItem={selectedItem} items={items} confirmDelete={deleteItems} setDialogVisible={setDeleteDialogVisible} dialogVisible={deleteDialogVisible} />
            <EditWarehousesDialog closeDialog={closeEditWarehouseDialog} dialogVisible={editWarehouseVisible} />
            <EditCategoriesDialog closeDialog={closeEditCategoriesDialog} dialogVisible={editCategoriesVisible} />
            <ItemModal visible={itemModalVisible} itemId={itemId} closeModal={closeItemModal} categories={props.categories} warehouses={props.warehouses}/>
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
    ItemsTable
};