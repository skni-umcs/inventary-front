import {
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import {DeleteForever} from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import RefreshIcon from '@material-ui/icons/Refresh';
import React, {useEffect, useState} from 'react';
import Draggable from 'react-draggable';
import ApiClient from '../../helpers/api-client';
import TokenType from '../../types/token.type';
import useStyles from './tokenModal.style';

interface TokenModalProps {
    visible: boolean;
    closeModal: () => void;
    openAddTokenDialog: () => void;
    onClick: (elementId: string) => void;
    refresh: () => void;
    tokens: TokenType[];
}

interface Opts {
    id?: number;
    token?: string;
}


const getActionsForToken = (opts: Opts) => {
    return (
        <>
            <IconButton onClick={() => alert(`http://yuumi.skni.umcs.pl:3001/register?token=${opts.token}`)}>
                <FileCopyIcon/>
            </IconButton>
            <IconButton onClick={() => console.log(`DELETE ${opts.id}`)}>
                <DeleteForever color={'secondary'}/>
            </IconButton>

        </>
    );
};

const TokenModal = (props: TokenModalProps) => {

    const classes = useStyles();

    const [displayUsed, setDisplayUsed] = useState(false);

    useEffect(() => {
        props.refresh();
    }, []);

    return (
        <Draggable handle={'#top-bar-handle'} cancel={'#top-bar-button'}
                   onMouseDown={() => props.onClick('token-modal-container')}>
            <div id='token-modal-container' style={{display: props.visible ? '' : 'none'}}
                 className={classes.container}>
                <div className={classes.topBar} id={'top-bar-handle'}>
                    <Typography component={'h3'} variant={'h4'} style={{userSelect: 'none'}}>Moje tokeny</Typography>
                    <IconButton onClick={props.closeModal}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                <div className={classes.utilityBar}>
                    <FormControlLabel
                        control={<IconButton onClick={props.refresh}>
                            <RefreshIcon/>
                        </IconButton>}
                        label='Odśwież'
                    />

                    <FormControlLabel
                        control={<Checkbox checked={displayUsed} value={displayUsed}
                                           onChange={() => setDisplayUsed(!displayUsed)} name='Display used'/>}
                        label='Wyświetl użyte'
                    />
                </div>
                <Table className={classes.tableContainer}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa tokenu</TableCell>
                            <TableCell>Token</TableCell>
                            <TableCell>Użycie</TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tokens.map(token => {
                            if (!displayUsed && token.usage === token.quota) {
                                return null;
                            }
                            return (
                                <TableRow key={token.id}>
                                    <TableCell className={classes.tableCell}>{token.name}</TableCell>
                                    <TableCell className={classes.tableCell}>{token.token}</TableCell>
                                    <TableCell className={classes.tableCell}>{token.usage} / {token.quota}</TableCell>
                                    <TableCell className={classes.tableCell}>{getActionsForToken(token)}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <div className={classes.bottomBar}>
                    <Button variant={'contained'} color={'primary'} onClick={props.openAddTokenDialog}>Dodaj
                        token</Button>
                </div>
            </div>
        </Draggable>
    );
};

export default TokenModal;