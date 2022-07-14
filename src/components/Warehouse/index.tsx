import TableBody from './TableBody';
import TableHeader from './TableHeader';
import React, {useEffect, useState} from "react";
import IItem from "../../types/item.type";
import {DataGrid, GridColDef, GridRowParams, GridSelectionModel} from '@material-ui/data-grid';
import ApiClient from "../../helpers/api-client";
import ItemModal from "../ItemModal";
import {Button} from "@material-ui/core";
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

const ItemsTable = () => {
    const [items, setItems] = useState<IItem[]>([]);

    const [itemModalVisible, setItemModalVisible] = useState(false);
    const [itemId, setItemId] = useState<number | undefined>(undefined);

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

            }
        );
    }

    // TODO: Open item modal before sending delete request
    return (
        <>
            <Button variant={'contained'} onClick={deleteItems} color={'secondary'}>Usuń wybrane</Button>
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