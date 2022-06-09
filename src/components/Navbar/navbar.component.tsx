import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { userLogout } from '../../redux/slice/authSlice';
import { logout } from '../../services/auth.services/auth.services';
import './nav.scss';

interface INavBar {}

const NavBar: FunctionComponent<INavBar> = () => {
    const dispatch = useAppDispatch();
    const { isLoggedIn, user } = useAppSelector((state) => state.data.auth);

    const toggleClickHandler = (event: React.MouseEvent<HTMLHeadingElement>) => {
        event.stopPropagation();
        event.currentTarget.classList.toggle('open');
    };

    const onLogout = () => {
        dispatch(userLogout());
        logout();
    };

    return (
        <div className="navBar">
            <div className="menu" onClick={toggleClickHandler}>
                <div className="nav_button">
                    <NavLink className="nav_link" to={'/'}></NavLink>
                </div>
                <span className="home nav">home home home</span>
                <div className="nav_button">
                    <NavLink className="nav_link" to={'/'}></NavLink>
                </div>
                <span className="home1 nav">home1 home1</span>
                <div className="nav_button">
                    <NavLink className="nav_link" to={'/'}></NavLink>
                </div>
                <span className="home2 nav">home2</span>
                <div className="nav_button"></div>
                <div className="nav_button"></div>
                <div className="nav_button"></div>
                <div className="nav_button"></div>
                <div className="nav_button"></div>
            </div>
            <div className="links">
                {!isLoggedIn ? (
                    <>
                        <NavLink to={'/login'} className="login">
                            Login
                        </NavLink>
                        <NavLink to={'/signup'} className="signup">
                            Sign Up
                        </NavLink>
                    </>
                ) : (
                    <div className="navbar_profile_logout">
                        <NavLink to={`profile/${user?.id}`} className="profile">
                            {user?.name} {user?.surname}
                        </NavLink>
                        <div onClick={onLogout} className="logout">
                            Logout
                        </div>
                    </div>
                )}
            </div>
            <Outlet />
        </div>
    );
};

export default NavBar;