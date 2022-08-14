import {IconButton, TableCell} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import React from 'react';

interface HiddenCellProps {
    children: string | undefined;
    className?: string;
    insideAlign: string;
}

const HiddenCell = (props: HiddenCellProps) => {

    const [visible, setVisible] = React.useState(false);

    const setVisibility = () => {
        setVisible(!visible);
    };

    return (
        <TableCell className={props.className}>
            {visible ?
                <span className={props.insideAlign}>
                    {props.children}
                    <IconButton onClick={setVisibility}>
                        <VisibilityOffIcon/>
                    </IconButton>
                </span>
                :
                <span className={props.insideAlign}>
                    {'●'.repeat(props.children?.length ?? 0)}
                    <IconButton onClick={setVisibility}>
                        <VisibilityIcon/>
                    </IconButton>
                </span>
                }
        </TableCell>
    );
};

export default HiddenCell;