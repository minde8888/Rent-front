import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./Navbar/Navbar";
import Signup from "./Auth/Signup/signup";
import { NavLink } from "react-router-dom";
import Basic from "./Auth/Login/login.component";

function Main(): JSX.Element {
    return (
        <div className="main">
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Basic />} />
                </Route>

            </Routes>
        </div >
    )
}

export default Main;