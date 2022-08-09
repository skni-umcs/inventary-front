import {
    DataGrid,
    GridColDef,
    GridRowParams,
    GridSelectionModel,
    GridValueFormatterParams
} from '@material-ui/data-grid';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import ApiClient from '../../helpers/api-client';
import emptyItem from '../../helpers/empty-item';
import ItemType from '../../types/item.type';
import ItemModal from '../ItemModal';
import MenuDrawer from '../MenuDrawer';
import TokenModal from '../TokenModal';
import AddItemDialog from './AddItemDialog';
import AddTokenDialog from './AddTokenDialog';
import DeleteItemDialog from './DeleteItemDialog';
import EditCategoriesDialog from './EditCategoriesDialog';
import EditWarehousesDialog from './EditWarehousesDialog';

interface ItemTableProps {
    drawerOpen: boolean;
    drawerOnClose: () => void;
    categories: string[];
    warehouses: string[];
}

const ItemsTable = (props: ItemTableProps) => {
    const [items, setItems] = useState<ItemType[]>([]);

    const [itemModalVisible, setItemModalVisible] = useState(false);
    const [itemId, setItemId] = useState<number | undefined>(undefined);

    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [addItemVisible, setAddItemVisible] = useState(false);
    const [editWarehouseVisible, setEditWarehouseVisible] = useState(false);
    const [editCategoriesVisible, setEditCategoriesVisible] = useState(false);
    const [tokenModalVisible, setTokenModalVisible] = useState(false);
    const [addTokenDialogVisible, setAddTokenDialogVisible] = useState(false);


    const [selectedItem, setSelectedItems] = useState<GridSelectionModel>([]);

    const [newItem, setNewItem] = useState<ItemType>(emptyItem);


    const cols: GridColDef[] = [
        {field: 'name', headerName: 'Nazwa', width: 350},
        {field: 'category', headerName: 'Kategoria', width: 250},
        {field: 'value', headerName: 'Wartość', width: 150,
            valueFormatter: (params) => {
            return `${(params.value as number) / 100}zł`;
        }},
        {field: 'warehouse', headerName: 'Magazyn', width: 250},
    ];

    const getAllItems = () => {
        ApiClient.getItems(99999, 0)
            .then(res => {
                setItems(res);
            })
            .catch(err => {
                    console.error(err);
                },
            );
    };

    useEffect(() => {
        getAllItems();
    }, []);

    const openItemModal = (row: GridRowParams) => {
        setItemModalVisible(true);
        setItemId(row.id as number);
    };

    const closeItemModal = () => {
        getAllItems();
        setItemModalVisible(false);
        setItemId(undefined);
    };

    const deleteItems = () => {
        ApiClient.deleteItems(selectedItem as number[], 0);
        getAllItems();
        setDeleteDialogVisible(false);
    };

    const openDialog = () => {
        if (selectedItem.length === 0) { return; }
        setDeleteDialogVisible(true);
    };

    const openAddDialog = () => {
        setAddItemVisible(true);
    };

    const openTokenModal = () => {
        setTokenModalVisible(true);
    };

    const setItemValue = (prop: string, value: string | string[]) => {
        setNewItem(prev => {
            return {
                ...prev,
                [prop]: value,
            };
        });
    };

    const moveToTop = (elementId: string) => {
        const elementA = elementId === 'item-modal-container' ? document.getElementById('item-modal-container') : document.getElementById('token-modal-container');
        const elementB = elementId === 'item-modal-container' ? document.getElementById('token-modal-container') : document.getElementById('item-modal-container');

        if (elementA === null || elementB === null) {
            return;
        }

        elementA.style.zIndex = '2';
        elementB.style.zIndex = '1';
    };

    const addItem = () => {
        ApiClient.addItem(newItem)
            .then(res => {
                if (res.message === 'success') {
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
    };

    const openEditWarehouseDialog = () => setEditWarehouseVisible(true);
    const closeEditWarehouseDialog = () => setEditWarehouseVisible(false);
    const openEditCategoriesDialog = () => setEditCategoriesVisible(true);
    const closeEditCategoriesDialog = () => setEditCategoriesVisible(false);
    const closeTokenModal = () => setTokenModalVisible(false);
    const openAddTokenDialog = () => setAddTokenDialogVisible(true);
    const closeAddTokenDialog = () => setAddTokenDialogVisible(false);

    return (
        <>
            <MenuDrawer open={props.drawerOpen} onClose={props.drawerOnClose} openDeleteDialog={openDialog}
                        openAddDialog={openAddDialog} openEditWarehouseDialog={openEditWarehouseDialog}
                        openEditCategoryDialog={openEditCategoriesDialog} openTokenModal={openTokenModal}/>

            <AddItemDialog newItem={newItem} setItemValue={setItemValue} warehouses={props.warehouses}
                           categories={props.categories} setAddItemVisible={setAddItemVisible} addItem={addItem}
                           dialogVisible={addItemVisible}/>

            <DeleteItemDialog selectedItem={selectedItem} items={items} confirmDelete={deleteItems}
                              setDialogVisible={setDeleteDialogVisible} dialogVisible={deleteDialogVisible}/>

            <EditWarehousesDialog closeDialog={closeEditWarehouseDialog} dialogVisible={editWarehouseVisible}/>

            <EditCategoriesDialog closeDialog={closeEditCategoriesDialog} dialogVisible={editCategoriesVisible}/>

            <AddTokenDialog closeDialog={closeAddTokenDialog} dialogVisible={addTokenDialogVisible}/>

            <ItemModal visible={itemModalVisible} itemId={itemId} closeModal={closeItemModal}
                       categories={props.categories} warehouses={props.warehouses} onClick={moveToTop}/>

            <TokenModal visible={tokenModalVisible} closeModal={closeTokenModal}
                        openAddTokenDialog={openAddTokenDialog} onClick={moveToTop}/>
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
};

export {
    ItemsTable,
};