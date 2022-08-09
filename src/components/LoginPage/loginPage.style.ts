import {createStyles, makeStyles, Theme} from '@material-ui/core';

import s1 from './szop.webp';
import s2 from './szop2.webp';

const szopy = [s1, s2];
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '50%',
            flexAlign: 'center',
            margin: 'auto',
        },
        header: {
            textAlign: 'center',
        },
        textField: {
            margin: theme.spacing(1),
        },
    }),
);


export {szopy};
export default useStyles;