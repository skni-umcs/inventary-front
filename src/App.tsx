import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Body from './components/Body';
import ItemPage from './components/ItemPage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import RegisterPage from './components/RegisterPage';
import ApiClient from './helpers/api-client';
import AuthClient from './helpers/auth-client';

function App() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const [categories, setCategories] = useState<string[]>([]);
    const [warehouses, setWarehouses] = useState<string[]>([]);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const getWarehouses = () => {
        ApiClient.getStorages()
            .then(res => {
                const output = [];
                try {
                    for (const item of res) {
                        output.push(item.name);
                    }
                } catch (e) {
                    // pass
                }
                setWarehouses(output);
            });
    };

    const getCategories = () => {
        ApiClient.getCategories()
            .then(res => {
                const output = [];
                try{
                    for (const item of res) {
                        output.push(item.name);
                    }
                } catch (e){
                    // pass
                }
                setCategories(output);
            });
    };

    const setupRefreshToken = () => {
        setInterval(() => {
            if (AuthClient.checkValid()) {
                ApiClient.refreshToken()
                    .then(res => {
                        console.log('Token refreshed');
                    });
            }
        }, 1000 * 60 * 5);
    };

    useEffect(() => {
        getCategories();
        getWarehouses();
        setupRefreshToken();
    }, []);

    return (
        <>
            <ToastContainer/>
            {AuthClient.checkValid() ? (
                <Navbar openDrawer={openDrawer}/>
            ) : (<></>)}
            <Routes>
                {AuthClient.checkValid() ? (
                    <>
                        <Route path='/' element={<Body drawerOpen={drawerOpen} drawerOnClose={closeDrawer}
                                                       warehouses={warehouses} categories={categories}/>}/>
                        <Route path='/item/:id' element={<ItemPage/>}/>
                    </>
                ) : (
                    <>
                        <Route path='/' element={<LoginPage/>}/>
                        <Route path='/register' element={<RegisterPage/>} />
                    </>
                )}
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
