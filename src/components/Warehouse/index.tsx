import TableBody from './TableBody';
import TableHeader from './TableHeader';
import React, {useEffect, useState} from "react";
import IItem from "../../types/item.type";
import {DataGrid, GridColDef, GridRowParams, GridSelectionModel} from '@material-ui/data-grid';
import ApiClient from "../../helpers/api-client";
import ItemModal from "../ItemModal";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";
import MenuDrawer from "../MenuDrawer";
/*
{
        id: 0,
        name: 'test item 1',
        category: "Test items",
        value: "1.00",
        warehouse: "Test warehouse",
        description: 'Test item 1 description',
        keywords: ['test', 'item', '1']
    }, {
        id: 1,
        name: 'test item 2',
        category: "Test items",
        value: "2.00",
        warehouse: "Test warehouse",
        description: 'Test item 2 description',
        keywords: ['test', 'item', '2']
    }
 */

interface ItemTableProps {
    drawerOpen: boolean,
    drawerOnClose: () => void,
}

const ItemsTable = (props: ItemTableProps) => {
    const [items, setItems] = useState<IItem[]>([]);

    const [itemModalVisible, setItemModalVisible] = useState(false);
    const [itemId, setItemId] = useState<number | undefined>(undefined);

    const [dialogVisible, setDialogVisible] = useState(false);

    const [selectedItem, setSelectedItems] = useState<GridSelectionModel>([]);


    const cols: GridColDef[] = [
        {field: 'name', headerName: 'Nazwa', width: 350},
        {field: 'category', headerName: 'Kategoria', width: 250},
        {field: 'value', headerName: 'Wartość', width: 150},
        {field: 'warehouse', headerName: 'Magazyn', width: 250}
    ];

    useEffect(() => {
        ApiClient.getItems(99999, 0).then((res: IItem[]) => {
            console.log(res);
            setItems(items.concat(res));
        });
    }, []);

    const openItemModal = (row: GridRowParams) => {
        setItemModalVisible(true);
        setItemId(row.id as number);
    }

    const closeItemModal = () => {
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

    const openAddModal = () => {
        console.log('todo');
    }

    return (
        <>
            <MenuDrawer open={props.drawerOpen} onClose={props.drawerOnClose} openDeleteDialog={openDialog} openAddModal={openAddModal}/>
            <Dialog
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={dialogVisible}
            >
                <DialogTitle id="confirmation-dialog-title">Usuń elementy</DialogTitle>
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