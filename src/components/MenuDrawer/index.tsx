import {Box, Button, Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CategoryIcon from '@material-ui/icons/Category';
import CloseIcon from '@material-ui/icons/Close';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import StoreIcon from '@material-ui/icons/Store';
import React from 'react';
import ApiClient from '../../helpers/api-client';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {Parser} from 'json2csv';
import ItemType from '../../types/item.type';

interface MenuDrawerProps {
    open: boolean;
    onClose: () => void;
    openDeleteDialog: () => void;
    openAddDialog: () => void;
    openEditWarehouseDialog: () => void;
    openEditCategoryDialog: () => void;
    openTokenModal: () => void;
}

const exportAll = (type: string) => {
    ApiClient.getItems(99999, 0)
        .then(res => {
            if (type === 'json') {
                const blob1 = new Blob([JSON.stringify(res)], {type: 'application/json'});
                const url1 = window.URL.createObjectURL(blob1);
                const anchorElement = document.createElement('a');
                anchorElement.href = url1;
                anchorElement.download = 'items.json';
                anchorElement.click();
                return;
            }
            const fields = [
                {label: 'Nazwa', value: 'name'},
                {label: 'Kategoria', value: 'category'},
                {label: 'Wartość', value: 'value'},
                {label: 'Magazyn', value: 'warehouse'},
                {label: 'Opis', value: 'description'},
                {label: 'Słowa kluczowe', value: 'keywords'},
            ];
            const json2csvParser = new Parser({fields});
            let csv = json2csvParser.parse(res);
            csv = csv.replace(/"/g, '');
            const rows = csv.split('\n');
            let finalCsv = rows[0].replace(/,/g, ';') + '\n';
            for (let i = 1; i < rows.length; i++) {
                let row = rows[i];
                const tags = row.split('[')[1].split(']')[0].split(',');
                row = row.split('[')[0].replace(/,/g, ';');
                row = row.concat(tags.join(','));
                finalCsv = finalCsv.concat(row + '\n');
            }
            const blob = new Blob([finalCsv], {type: 'text/csv'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'items.csv';
            link.click();
        })
        .catch(err => {
            console.error(err);
        });
};

const importData = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json,text/csv';
    fileInput.onchange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file.name.endsWith('.json')) {
            reader.onload = (ev: any) => {
                const data = JSON.parse(ev.target.result);
                ApiClient.importItems(data, 0);
            };
        } else if (file.name.endsWith('.csv')) {
            reader.onload = (ev: any) => {
                const data = ev.target.result;
                const rows = data.split('\n');
                const items: ItemType[] = [];
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i].split(';');
                    if (row.length < 5) {
                        continue;
                    }
                    const item: ItemType = {
                        id: 0,
                        name: row[0],
                        category: row[1],
                        value: row[2],
                        warehouse: row[3],
                        description: row[4],
                        keywords: row[5].split(','),
                    };
                    items.push(item);
                }
                ApiClient.importItems(items, 0);
            };

        }
        reader.readAsText(file);
    };
    fileInput.click();
};

const MenuDrawer = (props: MenuDrawerProps) => {
    return (
        <Drawer

            anchor='left'
            variant='temporary'
            open={props.open}
            onClose={props.onClose}
        >

            <Box sx={{
                p: 2,
                height: 1,
            }}>

                <IconButton onClick={props.onClose}>
                    <CloseIcon/>
                </IconButton>

                <Divider/>

                <Box sx={{mb: 2}}>
                    <ListItem button={true} onClick={props.openAddDialog}>
                        <ListItemIcon>
                            <AddCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Dodaj element'/>
                    </ListItem>

                    <ListItem button={true} onClick={props.openDeleteDialog}>
                        <ListItemIcon>
                            <DeleteSweepIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Usuń wybrane'/>
                    </ListItem>

                    <Divider/>

                    <ListItem button={true} onClick={props.openEditWarehouseDialog}>
                        <ListItemIcon>
                            <StoreIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Edytuj magazyny'/>
                    </ListItem>

                    <ListItem button={true} onClick={props.openEditCategoryDialog}>
                        <ListItemIcon>
                            <CategoryIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Edytuj kategorie'/>
                    </ListItem>

                    <Divider/>

                    <ListItem button={true} onClick={() => exportAll('csv')}>
                        <ListItemIcon>
                            <ImportExportIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Eksport [csv]'/>
                    </ListItem>
                    <ListItem button={true} onClick={() => exportAll('json')}>
                        <ListItemIcon>
                            <ImportExportIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Eksport [json]'/>
                    </ListItem>

                    <ListItem button={true} onClick={importData}>
                        <ListItemIcon>
                            <ImportExportIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Import'/>
                    </ListItem>
                </Box>


                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    flexDirection: 'column',
                    width: '90%',
                    margin: '12px',
                }}
                >
                    <ListItem button={true} onClick={props.openTokenModal}>
                        <ListItemIcon>
                            <VpnKeyIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Tokeny'/>
                    </ListItem>
                    <Button variant='contained' color={'primary'} style={{width: '100%'}}
                            onClick={ApiClient.logout}>Wyloguj</Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default MenuDrawer;