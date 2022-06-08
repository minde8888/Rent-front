import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import AccessDenied from '../auth/login/accessDenied/accessDenied.component';
import Home from '../home/home.component';

interface Props {
    role: Array<string>;
}

export const ProtectedRoute: React.FC<Props> = ({ role }) => {
    let { isLoggedIn, user } = useAppSelector((state) => state.data.auth);

    const userHasRequiredRole: boolean = typeof user?.roles === 'string' && role.includes(user?.roles) ? true : false;

    if (isLoggedIn && !userHasRequiredRole) {
        return <AccessDenied />;
    }
    if (isLoggedIn && userHasRequiredRole) {
        return <Home />;
    }
    if (!isLoggedIn && !userHasRequiredRole) {
        return <Navigate to="/login" replace />;
    }
    return null;
};
