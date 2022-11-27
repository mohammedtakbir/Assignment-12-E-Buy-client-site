import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { AuthContext } from '../contexts/AuthProvider';
import { useSeller } from '../Hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();
    if (loading || isSellerLoading) {
        return <Loading />
    }
    if (user && isSeller) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />

};

export default SellerRoute;