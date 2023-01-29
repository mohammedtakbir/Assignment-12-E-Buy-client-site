import React from 'react';
import { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Loading from '../../components/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import { useAdmin } from '../../Hooks/useAdmin';
import { useSeller } from '../../Hooks/useSeller';
import Navbar from '../../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user, loading } = useContext(AuthContext);

    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    return (
        <div className='bg-gray-50'>
            <Navbar />

            <div className="drawer drawer-mobile max-w-[1400px] mx-auto">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 lg:bg-transparent bg-base-100 text-base-content text-center pt-6">
                        <div className='mb-7'>
                            <h2 className='text-3xl cursor-pointer font-semibold text-center text-gray-800 '>
                                <Link to=''>E-Buy</Link>
                            </h2>
                            <div className='flex flex-col items-center mt-6 -mx-2'>
                                <Link to='/dashboard'>
                                    <img
                                        className='object-cover sm:w-20 w-12 sm:h-20 h-12 mx-2 rounded-full'
                                        src={user?.photoURL ? 
                                        user?.photoURL :
                                        'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'
                                        }
                                        alt='avatar'
                                        referrerPolicy='no-referrer'
                                    />
                                </Link>
                                <h4 className='mx-2 mt-2 font-medium text-gray-800'>
                                    {user?.displayName}
                                </h4>
                                <p className='mx-2 mt-1 text-sm font-medium text-gray-600'>
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        {isSeller ?
                            <>
                                <li className='mb-3'>
                                    <NavLink
                                        className='active:bg-transparent bg-gray-300 hover:bg-gray-500 hover:text-white justify-center'
                                        style={({ isActive }) =>
                                            isActive ? { backgroundColor: '#444' } : undefined
                                        }
                                        to='/dashboard/addAProducts'>Add A Product</NavLink>
                                </li>
                                <li className='mb-3'>
                                    <NavLink
                                        className='active:bg-transparent bg-gray-300 hover:bg-gray-500 hover:text-white justify-center'
                                        style={({ isActive }) =>
                                            isActive ? { backgroundColor: '#444' } : undefined
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
                                    <li className='mb-3'>
                                        <NavLink
                                            className='active:bg-transparent bg-gray-300 hover:bg-gray-500 hover:text-white justify-center'
                                            style={({ isActive }) =>
                                                isActive ? { backgroundColor: '#444' } : undefined
                                            }
                                            to='/dashboard/allSellers'>All Sellers</NavLink>
                                    </li>
                                    <li className='mb-3'>
                                        <NavLink
                                            className='active:bg-transparent bg-gray-300 hover:bg-gray-500 hover:text-white justify-center'
                                            style={({ isActive }) =>
                                                isActive ? { backgroundColor: '#444' } : undefined
                                            }
                                            to='/dashboard/allBuyers'>All Buyers</NavLink>
                                    </li>
                                    <li className='mb-3'>
                                        <NavLink
                                            className='active:bg-transparent bg-gray-300 hover:bg-gray-500 hover:text-white justify-center'
                                            style={({ isActive }) =>
                                                isActive ? { backgroundColor: '#444' } : undefined
                                            }
                                            to='/dashboard/reportedItems'>Reported Items</NavLink>
                                    </li>
                                </>
                                :
                                ''
                        }
                        {isSellerLoading || isAdminLoading ?
                            <Loading />
                            :
                            !isAdmin && !isSeller && <li>
                                <NavLink
                                    className='active:bg-transparent bg-gray-300 hover:bg-gray-500 hover:text-white justify-center'
                                    style={({ isActive }) =>
                                        isActive ? { backgroundColor: '#444' } : undefined
                                    }
                                    to='/dashboard/myOrders'>My Orders</NavLink>
                            </li>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;