import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from '../pages/App.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import PrivateRoutes from './PrivateRoutes.jsx';


export default function MainRouter() {
    return(
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path='/app' element={<App />} />
            </Route>
            <Route path='/' element={<Navigate replace to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
    )
}