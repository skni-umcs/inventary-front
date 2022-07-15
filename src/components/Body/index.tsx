import React from 'react';
import {Container} from "@material-ui/core";
import {ItemsTable} from '../Warehouse';

interface BodyProps {
    drawerOpen: boolean,
    drawerOnClose: () => void,
}

const Body = (props: BodyProps) => {
  return (
    <>
        <Container maxWidth="lg" style={{marginTop: '1%', height: '80vh'}}>
            <ItemsTable drawerOpen={props.drawerOpen} drawerOnClose={props.drawerOnClose}/>
        </Container>
    </>
  );
}

export default Body;