import React, { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

interface INavBar {

}

const NavBar: FunctionComponent<INavBar> = () => {
    return (
        <div>
            <h1>{"title"}</h1>
            <h2>{"subtitle"}</h2>
            <div>{"children"}</div>
            <Outlet />
        </div>
    );
};

export default NavBar;