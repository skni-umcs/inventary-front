import TableBody from './TableBody';
import TableHeader from './TableHeader';
import {useEffect, useState} from "react";
import IItem from "../../types/item.type";
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import ApiClient from "../../helpers/api-client";


const ItemsTable = () => {
    const [items, setItems] = useState<IItem[]>([{
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
    }]);
    const cols: GridColDef[] = [
        {field: 'name', headerName: 'Nazwa', width: 300},
        {field: 'category', headerName: 'Kategoria', width: 300},
        {field: 'value', headerName: 'Wartość', width: 300},
        {field: 'warehouse', headerName: 'Magazyn', width: 300},
    ];

    useEffect(() => {
        ApiClient.getItems(99999, 0).then((res: IItem[]) =>  {
            console.log(res);
            setItems(items.concat(res));
        });
    }, []);

    return (
      <>
        <DataGrid
            rows={items}
            columns={cols}

          />
      </>
    );
}

export {
    TableBody,
    TableHeader,
    ItemsTable
};