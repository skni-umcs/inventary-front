import {Container} from '@material-ui/core';
import React from 'react';
import {ItemsTable} from '../Warehouse';

interface BodyProps {
    drawerOpen: boolean;
    drawerOnClose: () => void;
    categories: string[];
    warehouses: string[];
}

const Body = (props: BodyProps) => {
    return (
        <>
            <Container maxWidth='lg' style={{marginTop: '1%', height: '80vh'}}>
                <ItemsTable drawerOpen={props.drawerOpen} drawerOnClose={props.drawerOnClose}
                            categories={props.categories} warehouses={props.warehouses}/>
            </Container>
        </>
    );
};

export default Body;