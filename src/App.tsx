import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import AuthClient from "./helpers/auth-client";
import Navbar from './components/Navbar';
import Body from './components/Body';
import LoginPage from './components/LoginPage';
import ItemPage from './components/ItemPage';
import NotFound from "./components/NotFound";
import './App.css'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ApiClient from "./helpers/api-client";


function App() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [categories, setCategories] = useState<string[]>([]);
    const [warehouses, setWarehouses] = useState<string[]>([]);

    const openDrawer = () => {
        setDrawerOpen(true);
    }

    const closeDrawer = () => {
        setDrawerOpen(false);
    }

    const getWarehouses = () => {
        ApiClient.getStorages()
            .then(res => {
                let output=[];
                for(let item of res){
                    output.push(item.name);
                }
                setWarehouses(output);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const getCategories = () => {
        ApiClient.getCategories()
            .then(res => {
                let output=[];
                for(let item of res){
                    output.push(item.name);
                }
                setCategories(output);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const setupRefreshToken = () => {
        setInterval(() => {
            ApiClient.refreshToken()
                .then(res => {
                    console.log('Token refreshed');
                }).catch(err => {
                    console.error(err);
                });
        }, 1000 * 60 * 5);
    }

    useEffect(() => {
        getCategories();
        getWarehouses();
        setupRefreshToken();
    }, []);

    return (
        <>
            <ToastContainer/>
            {AuthClient.checkValid() ? (
                <Navbar openDrawer={ openDrawer }/>
            ) : (<></>)}
            <Routes>
                {AuthClient.checkValid() ? (
                    <>
                        <Route path="/" element={<Body drawerOpen={drawerOpen} drawerOnClose={closeDrawer} warehouses={warehouses} categories={categories}/>}/>
                        <Route path="/item/:id" element={<ItemPage/>}/>
                    </>
                ) : (
                    <Route path="/" element={<LoginPage/>}/>
                )}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
