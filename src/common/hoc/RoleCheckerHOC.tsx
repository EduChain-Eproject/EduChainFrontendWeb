import React, { ComponentType } from 'react'
import { useAppSelector } from '../context/store';
import { Navigate } from 'react-router-dom';

const RoleCheckerHOC = <P extends object>(
    WrappedComponent: ComponentType<P>,
    requiredRole: string
) => {
    return (props: any) => {
        const { user, isAuthenticated } = useAppSelector((state) => state.auth);

        if (!isAuthenticated || user == null) {
            return <Navigate to="/Auth" />;
        }

        if (user.role !== requiredRole) {
            return <Navigate to="/unauthorized" />;
        }

        return <WrappedComponent {...props} />;
    };
};


export default RoleCheckerHOC;
