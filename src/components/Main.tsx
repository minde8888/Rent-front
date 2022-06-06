import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navbar/navbar';
import SignUp from './auth/signup/signup.component';
import Login from './auth/login/login.component';
import Home from './home/home.component';
import { ProtectedRoute } from './route/protectedRoute';
import { Roles } from './auth/roles/roles.const';
import ForgotPassword from './auth/restorePassword/forgotPassword.component';

function Main(): JSX.Element {
    return (
        <div className="main">
            <NavBar />
            <Routes>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
                <Route element={<ProtectedRoute role={[Roles.user, Roles.admin]} />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default Main;
