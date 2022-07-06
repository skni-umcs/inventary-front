import React from 'react';
import {Container, Table, TableBody} from "@material-ui/core";
import {ItemsTable} from '../Warehouse';

const Body = () => {
  return (
    <>
        <Container maxWidth="lg" style={{height: '80vh'}}>
        <ItemsTable />
        {/*    <Table>*/}
        {/*        <TableBody>*/}
        {/*            <TableHeader />*/}
        {/*            <ItemsBody />*/}
        {/*        </TableBody>*/}
        {/*        </Table>*/}
        </Container>
    </>
  );
}

export default Body;