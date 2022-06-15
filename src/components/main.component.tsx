import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './route/protectedRoute';
import { Roles } from './auth/roles/roles.const';

// import ForgotPassword from './auth/restorePassword/forgotPassword.component';
// import Preloader from './preloader/preloader.component';
// import Home from './home/home.component';
// import Login from './auth/login/login.component';
// import SignUp from './auth/signup/signup.component';
// import NavBar from './navbar/navbar.component';
// import Profile from './profile/profile.component';
// import Products from './products/products.component';

const ForgotPassword = lazy(() => import('./auth/restorePassword/forgotPassword.component'));
const Preloader = lazy(() => import('./preloader/preloader.component'));
const Home = lazy(() => import('./home/home.component'));
const Login = lazy(() => import('./auth/login/login.component'));
const SignUp = lazy(() => import('./auth/signup/signup.component'));
const NavBar = lazy(() => import('./navbar/navbar.component'));
const Profile = lazy(() => import('./profile/profile.component'));
const Products = lazy(() => import('./products/products.component'));

function Main(): JSX.Element {
    return (
        <div className="main">
            <NavBar />
            <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<p>There's nothing here: 404!</p>} />
                    <Route path="/" element={<ProtectedRoute role={[Roles.user, Roles.admin]} component={Home} />} />
                    <Route path="/products" element={<ProtectedRoute role={[Roles.user, Roles.admin]} component={Products} />} />
                    <Route path="/profile/:id" element={<ProtectedRoute role={[Roles.user, Roles.admin]} component={Profile} />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default Main;
