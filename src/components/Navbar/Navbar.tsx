import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './nav.scss';

interface INavBar {}

const NavBar: FunctionComponent<INavBar> = () => {
    const toggleClickHandler = (event: React.MouseEvent<HTMLHeadingElement>) => {
        event.currentTarget.classList.toggle('open');
    };

    return (
        <div className="menu" onClick={toggleClickHandler}>
            <div className="button"></div>
            <div className="button"></div>
            <div className="button"></div>
        </div>
    );
};

export default NavBar;
