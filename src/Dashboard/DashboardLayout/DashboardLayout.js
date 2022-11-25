import React from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useAdmin } from '../../Hooks/useAdmin';
import { useSeller } from '../../Hooks/useSeller';
import Navbar from '../../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email);

    return (
        <>
            <Navbar />
            <div className="drawer drawer-mobile container mx-auto">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 lg:bg-transparent bg-base-100 text-base-content">
                        {isSeller ?
                            <>
                                <li><Link to='/dashboard/addAProducts'>Add A Product</Link></li>
                                <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                            </>

                            :
                            ''
                        }
                        {
                            isAdmin ?
                                <>
                                    <li><Link to='/dashboard'>All Sellers</Link></li>
                                    <li><Link to='/dashboard'>All Buyers</Link></li>
                                    <li><Link to='/dashboard'>Reported Items</Link></li>
                                </>
                                :
                                ''
                        }
                        {
                            !isAdmin && !isSeller && <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                        }
                    </ul>

                </div>
            </div>
        </>
    );
};

export default DashboardLayout;