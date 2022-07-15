import React from "react";
import {Box, Button, Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ApiClient from "../../helpers/api-client";
import StoreIcon from '@material-ui/icons/Store';

interface MenuDrawerProps {
    open: boolean,
    onClose: () => void,
    openDeleteDialog: () => void,
    openAddModal: () => void,
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
                    <ListItem button onClick={props.openAddModal}>
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

                    <ListItem button>
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edytuj magazyny" />
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