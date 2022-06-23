import React from 'react';
import {Container, Table, TableBody} from "@material-ui/core";
import {TableBody as ItemsBody, TableHeader} from '../Warehouse';

const Body = () => {
  return (
    <>
        <Container maxWidth="lg">
            <Table>
                <TableBody>
                    <TableHeader />
                    <ItemsBody />
                </TableBody>
                </Table>
        </Container>
    </>
  );
}

export default Body;