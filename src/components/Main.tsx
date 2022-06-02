import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navbar/navbar';
import SignUp from './auth/signup/signup.component';
import Login from './auth/login/login.component';
import Home from './home/home';

function Main(): JSX.Element {
    return (
        <div className="main">
            <NavBar />
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </div>
    );
}

export default Main;
