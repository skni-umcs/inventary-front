import React from "react";
import {Box, Button, Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ApiClient from "../../helpers/api-client";
import StoreIcon from '@material-ui/icons/Store';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import { Parser } from "json2csv";

interface MenuDrawerProps {
    open: boolean,
    onClose: () => void,
    openDeleteDialog: () => void,
    openAddDialog: () => void,
    openEditWarehouseDialog: () => void,
}

const exportAll = () => {
    ApiClient.getItems(99999, 0)
        .then(res => {
            const fields = [
                { label: 'Nazwa', value: 'name' },
                { label: 'Kategoria', value: 'category' },
                { label: 'Wartość', value: 'value' },
                { label: 'Magazyn', value: 'warehouse' },
                { label: 'Opis', value: 'description' },
                { label: 'Słowa kluczowe', value: 'keywords' }
            ];
            const json2csvParser = new Parser({ fields });
            let csv = json2csvParser.parse(res);
            csv = csv.replace(/"/g, '');
            let rows = csv.split('\n');
            let finalCsv = rows[0].replace(/,/g, ';') + '\n';
            for(let i = 1; i < rows.length; i++) {
                let row = rows[i];
                let tags = row.split('\[')[1].split('\]')[0].split(',');
                row = row.split('[')[0].replace(/,/g, ';');
                row = row.concat(tags.join(','));
                finalCsv = finalCsv.concat(row + '\n');
            }
            const blob = new Blob([finalCsv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'items.csv';
            link.click();
        })
        .catch(err => {
            console.error(err);
        });
}

const MenuDrawer = (props: MenuDrawerProps) => {
    return (
        <Drawer

            anchor="left"
            variant="temporary"
            open={props.open}
            onClose={props.onClose}
        >

            <Box sx={{
                p: 2,
                height: 1,
            }}>

                <IconButton  onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>

                <Divider/>

                <Box sx={{mb: 2}}>
                    <ListItem button onClick={props.openAddDialog}>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dodaj element" />
                    </ListItem>

                    <ListItem button onClick={props.openDeleteDialog}>
                        <ListItemIcon>
                            <DeleteSweepIcon />
                        </ListItemIcon >
                        <ListItemText primary="Usuń wybrane" />
                    </ListItem>

                    <ListItem button onClick={props.openEditWarehouseDialog}>
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edytuj magazyny" />
                    </ListItem>

                    <ListItem button onClick={exportAll}>
                        <ListItemIcon>
                            <ImportExportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Wyeksportuj" />
                    </ListItem>
                </Box>


                <Box sx={{
                    display: "flex",
                    justifyContent:"center",
                    position: "absolute",
                    width: "100%",
                    bottom: "0",
                    left: "0",}}
                >
                    <Button variant="contained" color={'primary'} style={{width: '100%', margin: '0 12px 12px 12px'}} onClick={ApiClient.logout}>Wyloguj</Button>
                </Box>
            </Box>
        </Drawer>
    );
}

export default MenuDrawer;