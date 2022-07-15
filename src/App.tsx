import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import AuthClient from "./helpers/auth-client";
import Navbar from './components/Navbar';
import Body from './components/Body';
import LoginPage from './components/LoginPage';
import ItemPage from './components/ItemPage';
import NotFound from "./components/NotFound";
import './App.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => {
        setDrawerOpen(true);
    }

    const closeDrawer = () => {
        setDrawerOpen(false);
    }

    return (
        <>
            <ToastContainer/>
            {AuthClient.checkValid() ? (
                <Navbar openDrawer={ openDrawer }/>
            ) : (<></>)}
            <Routes>
                {AuthClient.checkValid() ? (
                    <>
                        <Route path="/" element={<Body drawerOpen={drawerOpen} drawerOnClose={closeDrawer}/>}/>
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
