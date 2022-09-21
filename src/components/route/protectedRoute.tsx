import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import AccessDenied from '../auth/login/accessDenied/accessDenied.component';

interface Props {
    role: Array<string>;
}

export const ProtectedRoute: React.FC<Props> = ({ role }) => {
    let { isLoggedIn } = useAppSelector((state) => state.data.auth);
    let { roles } = useAppSelector((state) => state.data.user);

    const userHasRequiredRole: boolean = typeof roles === 'string' && role.includes(roles) ? true : false;

    if (isLoggedIn && !userHasRequiredRole) {
        return <AccessDenied />;
    }
    if (isLoggedIn && userHasRequiredRole) {
        return <Outlet />;
    }
    if (!isLoggedIn || !userHasRequiredRole) {
        return <Navigate to="/" replace />;
    }
    return null;
};
