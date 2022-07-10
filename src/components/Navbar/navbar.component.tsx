import { FunctionComponent, MouseEventHandler } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import { useAppDispatch } from '../../hooks/redux.hooks';
import { userLogout } from '../../redux/slice/authSlice';
import { logout } from '../../services/auth.services/auth.services';
import './nav.scss';

interface INavBar { }

const NavBar: FunctionComponent<INavBar> = () => {
    const dispatch = useAppDispatch();
    let { isLoggedIn } = useAppSelector((state) => state.data.auth);
    let { surname, name, id } = useAppSelector((state) => state.data.user);

    const toggleClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        event.currentTarget.classList.toggle('open');
    };

    const onLogout = () => {
        dispatch(userLogout());
        logout();
    };

    const style = { justifyContent: "flex-end" }
    return (
        <div className="navBar" style={!isLoggedIn ? style : undefined}>


            {!isLoggedIn ? (
                <div className="links" >
                    <NavLink to={'/login'} className="login">
                        Login
                    </NavLink>
                    <NavLink to={'/signup'} className="signup">
                        Sign Up
                    </NavLink>
                </div>

            ) : (
                <>
                    <button className="menu" onClick={toggleClickHandler}>
                        <div className="nav_button">
                            <NavLink className="nav_link" to={'/'}></NavLink>
                        </div>
                        <span className="home nav">home</span>
                        <div className="nav_button">
                            <NavLink className="nav_link" to={'/products'}></NavLink>
                        </div>
                        <span className="home1 nav">products</span>
                        <div className="nav_button">
                            <NavLink className="nav_link" to={'/add-products'}></NavLink>
                        </div>
                        <span className="home2 nav">add products</span>
                        <div className="nav_button"></div>
                        <div className="nav_button"></div>
                        <div className="nav_button"></div>
                        <div className="nav_button"></div>
                        <div className="nav_button"></div>
                    </button>
                    <div className="links" >
                        <div className="navbar_profile_logout">
                            <NavLink to={`profile/${id}`} className="profile">
                                {name} {surname}
                            </NavLink>
                            <button onClick={onLogout} className="userLogout">
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}

            <Outlet />
        </div>
    );
};

export default NavBar;
