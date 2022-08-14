import {createStyles, makeStyles, Theme} from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'absolute',
            zIndex: 1,
            transform: 'translate(-50%, -50%)',
            width: '50vw',
            height: '60vh',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            overflowY: 'auto',
        },
        topBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ccc',
        },
        bottomBar: {
            display: 'flex',
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
            padding: '0.5rem',
        },
        tableCell: {
            height: '32px',
            padding: '3px',
            paddingLeft: '16px',
        },
        hiddenCell: {
            width: '75%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        tableContainer: {
            width: '100%',
            height: 'auto',
        },
        spacer: {
            marginTop: '0.5rem',
            marginLeft: '0.5rem',
        },
        utilityBar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
    }),
);

export default useStyles;