import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import style from './nav.module.scss'

interface INavBar {

}

const NavBar: FunctionComponent<INavBar> = () => {
    return (
        <nav>
            <div className={style.container}>
                <div>{"home"}</div>
                <div>{"children"}</div>
                <div>{"children"}</div>
                <NavLink to={"/login"} className="nav-link">
                    Login
                </NavLink>
                <NavLink to={"/signup"} className="nav-link">
                    Sign Up
                </NavLink>
                <Outlet />
            </div>
        </nav>
    );
};

export default NavBar;