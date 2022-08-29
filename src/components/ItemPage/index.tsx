import {CircularProgress, Container, Paper, Typography} from '@material-ui/core';
import React, {Suspense, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ApiClient from '../../helpers/api-client';
import ItemType from '../../types/item.type';

const ItemPage = () => {
    return (
        <>
            <Container maxWidth={'lg'}>
                <Suspense fallback={<CircularProgress/>}>
                    <ItemDisplay/>
                </Suspense>
            </Container>
        </>
    );
};

const ItemDisplay = () => {
    const {id} = useParams();
    const [item, setItem] = useState<ItemType>();

    useEffect(() => {
        if (id === undefined) {
            window.location.href = '/inventaryapp';
            return;
        }
        ApiClient.getItemById(Number.parseInt(id, 10)).then(res => {
            setItem(res.data);
            console.log(res);
        });
    });

    return (
        <>
            <Paper elevation={0}>
                <Typography variant={'h1'}>{item?.name}</Typography>
            </Paper>
        </>
    );
};

export default ItemPage;