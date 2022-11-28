import React from 'react';
import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Loading from '../../components/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import { useAdmin } from '../../Hooks/useAdmin';
import { useSeller } from '../../Hooks/useSeller';
import Navbar from '../../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user, loading } = useContext(AuthContext);
   
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
                                <li>
                                    <NavLink
                                        className='active:bg-transparent'
                                        style={({ isActive }) =>
                                            isActive ? { backgroundColor: '#333' } : undefined
                                        }
                                        to='/dashboard/addAProducts'>Add A Product</NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className='active:bg-transparent'
                                        style={({ isActive }) =>
                                            isActive ? { backgroundColor: '#333' } : undefined
                                        }
                                        to='/dashboard/myProducts'>My Products</NavLink>
                                </li>
                            </>
                            :
                            ''
                        }
                        {
                            isAdmin ?
                                <>
                                    <li>
                                        <NavLink
                                            className='active:bg-transparent'
                                            style={({ isActive }) =>
                                                isActive ? { backgroundColor: '#333' } : undefined
                                            }
                                            to='/dashboard/allSellers'>All Sellers</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className='active:bg-transparent'
                                            style={({ isActive }) =>
                                                isActive ? { backgroundColor: '#333' } : undefined
                                            }
                                            to='/dashboard/allBuyers'>All Buyers</NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className='active:bg-transparent'
                                            style={({ isActive }) =>
                                                isActive ? { backgroundColor: '#333' } : undefined
                                            }
                                            to='/dashboard/reportedItems'>Reported Items</NavLink>
                                    </li>
                                </>
                                :
                                ''
                        }
                        {
                            !isAdmin && !isSeller && <li>
                                <NavLink
                                    className='active:bg-transparent'
                                    style={({ isActive }) =>
                                        isActive ? { backgroundColor: '#333' } : undefined
                                    }
                                    to='/dashboard/myOrders'>My Orders</NavLink>
                            </li>
                        }
                    </ul>

                </div>
            </div>
        </>
    );
};

export default DashboardLayout;