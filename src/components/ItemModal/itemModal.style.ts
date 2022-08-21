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
            justifyContent: 'space-between',
        },
        topBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ccc',
        },
        mainContainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '0px auto',
        },
        row: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },
        centered: {
            margin: 'auto',
            marginBottom: '5%',
        },
        footerRow: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingTop: '3%',
            marginRight: '4%',
        },
        infoContainer: {
            width: '40%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        textField: {
            marginTop: '8px',
            width: '90%',
        },
        textFieldW: {
            marginTop: '8px',
            width: '98%',
        },
    }),
);

export default useStyles;