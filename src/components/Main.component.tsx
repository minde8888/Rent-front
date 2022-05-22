import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const NavBar = lazy(() => import("./Navbar/Navbar.component"))
const Signup = lazy(() => import("./Auth/Signup/Signup.component"))
const Basic = lazy(() => import("./Auth/Login/Login.component"))
const Preloader = lazy(() => import("./Preloader/Preloader"))

function Main(): JSX.Element {
    return (

        <div className="main">
            <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Basic />} />
                    </Route>
                </Routes>
            </Suspense>
        </div >
    )
}

export default Main;