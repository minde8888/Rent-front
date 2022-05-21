import React, { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./Navbar/Navbar";
import Signup from "./Auth/Signup/Signup";
import { NavLink } from "react-router-dom";

function Main(): JSX.Element {
    return (
        <div className="main">
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="/signup" element={<Signup />} />
                </Route>

            </Routes>
        </div >
    )
}

export default Main;