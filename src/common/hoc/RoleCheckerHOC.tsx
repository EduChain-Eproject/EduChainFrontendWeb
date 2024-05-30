import React, { ComponentType } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../context/store';
import { Navigate } from 'react-router-dom';
interface RoleCheckerHOCProps {
    requiredRole: string;
}

const RoleCheckerHOC = <P extends object>(
    WrappedComponent: ComponentType<P>,
    requiredRole: string
) => {
    return (props: any) => {
        const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

        if (!isAuthenticated || user == null) {
            return <Navigate to="/login" />;
        }

        console.log(user);

        if (user.role !== requiredRole) {
            return <Navigate to="/unauthorized" />;
        }

        return <WrappedComponent {...props} />;
    };
};


export default RoleCheckerHOC;
