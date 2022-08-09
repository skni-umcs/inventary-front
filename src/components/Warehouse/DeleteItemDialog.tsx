import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@material-ui/core';
import {GridRowId} from '@material-ui/data-grid';
import React from 'react';
import ItemType from '../../types/item.type';
import DialogType from './dialog.type';

interface DeleteItemDialogProps extends DialogType {
    selectedItem: GridRowId[];
    items: ItemType[];
    confirmDelete: () => void;
    setDialogVisible: (visible: boolean) => void;
}

const DeleteItemDialog = (props: DeleteItemDialogProps) => {
    return (
        <Dialog
            maxWidth='xs'
            aria-labelledby='delete-title'
            open={props.dialogVisible}
        >
            <DialogTitle id='delete-title'>Usuń elementy</DialogTitle>
            <DialogContent dividers={true}>
                <Typography variant={'subtitle2'} component={'h5'}>Czy na pewno chcesz usunąć wybrane
                    elementy?</Typography>
                <ol>
                    {props.selectedItem.map((item: any) => {
                        return <Typography key={item} variant={'subtitle1'} component={'h6'}>
                            <li>{props.items.find((i: ItemType) => i.id === item)?.name}</li>
                        </Typography>;
                    })}
                </ol>
            </DialogContent>
            <DialogActions>
                <Button autoFocus={true} onClick={e => props.setDialogVisible(false)} color='primary'>
                    Anuluj
                </Button>
                <Button onClick={props.confirmDelete} color='primary'>
                    Usuń
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteItemDialog;