import { replace } from 'formik';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed: boolean, redirectPath = '/landing', children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};
