import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './route/protectedRoute';
import { Roles } from './auth/roles/roles.const';
import ForgotPassword from './auth/restorePassword/forgotPassword.component';
import { Profile } from './profile/profile.component';

const Preloader = lazy(() => import('./preloader/preloader.component'));
const Home = lazy(() => import('./home/home.component'));
const Login = lazy(() => import('./auth/login/login.component'));
const SignUp = lazy(() => import('./auth/signup/signup.component'));
const NavBar = lazy(() => import('./navbar/navbar.component'));
// const Profile = lazy(() => import('./profile/profile.component'));

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
                    <Route element={<ProtectedRoute role={[Roles.user, Roles.admin]} />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default Main;
