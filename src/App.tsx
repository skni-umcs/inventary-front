import React from 'react';
import {Routes, Route} from "react-router-dom";
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
  return (
    <>
        <Navbar />
        <ToastContainer />
        <Routes>
            {AuthClient.getJwt() ? (
                <>
                    <Route path="/" element={<Body />} />
                    <Route path="/item/:id" element={<ItemPage />} />
                </>
            ) : (
                <Route path="/" element={<LoginPage />} />
            )}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;