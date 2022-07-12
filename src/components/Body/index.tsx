import React from 'react';
import {Container} from "@material-ui/core";
import {ItemsTable} from '../Warehouse';

const Body = () => {
  return (
    <>
        <Container maxWidth="lg" style={{marginTop: '1%', height: '80vh'}}>
            <ItemsTable />
        </Container>
    </>
  );
}

export default Body;