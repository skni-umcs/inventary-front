import React, {Suspense, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import IItem from "../../types/item.type";
import ApiClient from "../../helpers/api-client";
import {CircularProgress, Container, Paper, Typography} from '@material-ui/core';

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
    const [item, setItem] = useState<IItem>();

    useEffect(() => {
        if (id == undefined) {
            window.location.href = '/';
            return;
        }
        ApiClient.getItemById(Number.parseInt(id)).then(res => {
            setItem(res.data);
            console.log(res);
        });
    })

    return (
        <>
            <Paper elevation={0}>
                <Typography variant={'h1'}>{item?.name}</Typography>
            </Paper>
        </>
    );
}

export default ItemPage;