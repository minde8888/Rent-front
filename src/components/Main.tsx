import React, { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './Navbar/Navbar';
import SignUp from './Auth/Signup/signup';
import { NavLink } from 'react-router-dom';
import Basic from './Auth/Login/loginomponent';

function Main(): JSX.Element {
    return (
        <div className="main">
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Basic />} />
                </Route>
            </Routes>
        </div>
    );
}

export default Main;
