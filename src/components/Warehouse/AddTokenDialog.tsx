import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import React, {useState} from 'react';
import ApiClient from '../../helpers/api-client';
import ItemType from '../../types/item.type';
import TokenType from '../../types/token.type';
import useStyles from '../ItemModal/itemModal.style';
import TagInput from '../ItemModal/TagInput';
import DialogType from './dialog.type';


interface AddTokenDialogProps extends DialogType {
    closeDialog: (refresh?: boolean) => void;
}

const AddTokenDialog = (props: AddTokenDialogProps) => {

    const [token, setToken] = useState<TokenType>({
        name: '',
        quota: 0,
    });

    const addToken = () => {
        ApiClient.addToken(token.name, token.quota)
            .then(res => {
                if (res.message === 'OK') {
                    props.closeDialog(true);
                }
            });
    };

    return (
        <Dialog
            maxWidth='xs'
            aria-labelledby='add-title'
            open={props.dialogVisible}
        >
            <DialogTitle id='add-title'>Dodaj token rejestracji</DialogTitle>
            <DialogContent dividers={true}>
                <Box display='flex' flexDirection='column'>
                    <TextField
                        label='Nazwa tokenu'
                        variant='outlined'
                        margin='normal'
                        fullWidth={true}
                        value={token.name}
                        onChange={(e) => setToken({...token, name: e.target.value})}
                    />
                    <FormControl variant='outlined' margin='normal' fullWidth={true}>
                        <InputLabel id='token-quota-label'>Limit użyć</InputLabel>
                        <Select
                            labelId='token-quota-label'
                            id='token-quota'
                            value={token.quota}
                            onChange={(e) => setToken({...token, quota: e.target.value as number})}
                            label='Limit użyć'
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus={true} onClick={() => props.closeDialog()} color='primary'>
                    Anuluj
                </Button>
                <Button onClick={addToken} color='primary'>
                    Dodaj
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTokenDialog;