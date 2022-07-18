import React from "react";
import DialogType from "./dialog.type";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";

interface EditWarehousesDialogProps extends DialogType {
    closeDialog: () => void,
}

const EditWarehousesDialog = (props: EditWarehousesDialogProps) => {
    return (
        <Dialog
            maxWidth="xs"
            aria-labelledby="delete-title"
            open={props.dialogVisible}
        >
            <DialogTitle id="delete-title">Edytuj magazyny</DialogTitle>
            <DialogContent dividers>
                <Typography variant={'subtitle2'} component={'h5'}></Typography>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeDialog} color="primary">
                    Zamknij
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditWarehousesDialog;