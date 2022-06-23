import React, {useEffect, useState} from 'react';
import ApiClient from "../../helpers/api-client";
import IItem from "../../types/item.type";
import {Box, Button, TableCell, TableRow} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Link} from "react-router-dom";

const TableBody = () => {

    const itemCount = 10;
    const currency = 'zł';
    const [page, setPage] = useState(0);

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

    useEffect(() => {
        ApiClient.getItems(itemCount, page * itemCount).then((res: IItem[]) =>  {
            console.log(res);
            setItems(items.concat(res));
        });
    }, []);


    return (
        <>
            {items.map((item: IItem, index: number) => { return (
                <TableRow key={index}>
                    <TableCell><Link to={'/item/' + item.id}> {item.name}</Link></TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.value}{currency}</TableCell>
                    <TableCell>{item.warehouse}</TableCell>
                </TableRow>
                );
            })}
            <TableRow>
                <TableCell colSpan={2}>
                    <Box textAlign={'right'}>
                        <Button variant={'contained'}
                                onClick={() => setPage(page - 1)}
                                disabled={page === 0}
                                color={'default'}
                                startIcon={<ArrowBackIosIcon />}>
                        Poprzednia strona
                        </Button>
                    </Box>
                </TableCell>
                <TableCell colSpan={2}>
                    <Box textAlign={'left'}>
                        <Button variant={'contained'}
                                onClick={() => setPage(page + 1)}
                                color={'default'}
                                endIcon={<ArrowForwardIosIcon />}>
                        Następna strona
                        </Button>
                    </Box>
                </TableCell>
            </TableRow>
        </>
    );
}

export default TableBody;