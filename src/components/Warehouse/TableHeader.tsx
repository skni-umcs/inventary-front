import React from 'react'
import {TableCell, TableRow} from "@material-ui/core";

const TableHeader = () => {
    return (
        <TableRow>
            <TableCell>
                <h1>Nazwa</h1>
            </TableCell>
            <TableCell>
                <h1>Kategoria</h1>
            </TableCell>
            <TableCell>
                <h1>Wartość</h1>
            </TableCell>
            <TableCell>
                <h1>Magazyn</h1>
            </TableCell>
        </TableRow>
    )
};

export default TableHeader;