import {createStyles, makeStyles, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            position: 'absolute',
            width: '40vw',
            height: '70vh',
            backgroundColor: 'white',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: '6px',
            boxShadow: '1px 1px 10px 0px rgba(66, 68, 90, 1)',
            padding: 0
        },
        topBar: {
            backgroundColor: 'white',
            borderBottom: '1px solid black',
            width: '95%',
            height: '64px',
            display: 'flex',
            margin: 'auto 6px',
            justifyContent: 'space-between'
        },
        Btn: {
            width: '48px',
            height: '48px'
        },
        mainContainer: {
            width: '100%',
            height: '82%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '0px auto',
            // transform: 'translateY(-30%)'
        },
        row: {
            width: '90%',
            display: 'flex',
            justifyContent: 'space-between',
        },
        centered: {
            margin: 'auto',
            marginBottom: '5%',
        },
        infoContainer: {
            width: '40%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        textField: {
            marginTop: '8px',
            width: '90%'
        }
    })
);

export default useStyles;