import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { FaUserAlt, FaGift } from "react-icons/fa";
import { MdBrandingWatermark } from "react-icons/md";

const Navbar = () => {
    const { user, userSignOut } = useContext(AuthContext);

    const handleSignOut = () => {
        userSignOut()
            .then(() => {
                toast.success('Sign Out Successfully')
            })
            .catch(err => { })
    }

    const menuItems = <>
        <div className='ml-3 mr-7'>
            <li>
                <a href='#popular-brands' className='p-0 active:bg-transparent' to=''>
                    <a href='#popular-brands' className='text-white active:bg-transparent'><MdBrandingWatermark className='inline' /></a>
                    <div className='flex-col justify-center !p-0 !gap-0 active:bg-transparent ml-1'>
                        <p className='text-white text-sm'>Popular Brands</p>
                        <div className='text-gray-300 text-[11px]'>
                            <Link to='#popular-brands' className='active:bg-transparent'>Popular Deals</Link>
                        </div>
                    </div>
                </a>
            </li>
        </div>
        <div className='lg:pt-0 pt-3 ml-3 mr-7'>
            <li>
                <a href='#offers' className='p-0 active:bg-transparent' to=''>
                    <a href='#offers' className='text-white active:bg-transparent'><FaGift className='inline' /></a>
                    <div className='flex-col justify-center !p-0 !gap-0 active:bg-transparent ml-1'>
                        <p className='text-white text-sm'>Offers</p>
                        <div className='text-gray-300 text-[11px]'>
                            <a href='#offers' className='active:bg-transparent'>Latest Offers</a>
                        </div>
                    </div>
                </a>
            </li>
        </div>
        {user?.uid ?
            <>
                <li className='lg:ml-0 lg:my-0 lg:pt-0 pt-3 text-base'>
                    <div className="dropdown md:dropdown-end active:bg-transparent">
                        <label tabIndex={0}>
                            <img title={user?.displayName ?
                                user?.displayName :
                                'Not Defined'
                            }
                                className='w-[30px] rounded-full cursor-pointer'
                                src={user?.photoURL ?
                                    user?.photoURL :
                                    `https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000`}
                                alt="" />
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content p-2 shadow rounded-box w-56 mt-[300px] bg-[#222]"
                        >
                            <img
                                title={user?.displayName ?
                                    user?.displayName :
                                    'Not Defined'
                                }
                                className='w-[50px] rounded-full cursor-pointer mx-auto mt-3'
                                alt=""
                                src={user?.photoURL ?
                                    user?.photoURL :
                                    `https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000`}
                            />
                            <p className='text-sm mt-3 text-center font-medium text-white'>{user?.displayName}</p>
                            <p className='text-xs mb-2 text-center text-[#fff]'>{user?.email}</p>
                            <li className='mt-5'>
                                <Link
                                    to='/dashboard'
                                    className='justify-center py-2 mb-2 text-sm inline-block mx-auto text-white hover:bg-[#444] bg-[#333]'
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleSignOut}
                                    className='justify-center py-2 mb-2 text-sm inline-block mx-auto text-white hover:bg-[#444] bg-[#333]'
                                >
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
            </>
            :
            <>
                <div className='ml-3 lg:pt-0 pt-3'>
                    <li>
                        <Link className='p-0 active:bg-transparent' to='/login'>
                            <Link className='text-white active:bg-transparent'><FaUserAlt className='inline' /></Link>
                            <div className='flex-col justify-center !p-0 !gap-0 active:bg-transparent ml-1'>
                                <p className='text-white text-sm'>Account</p>
                                <div className='text-gray-300 text-[11px]'>
                                    <Link to='/signup' className='active:bg-transparent hover:text-white'>Register</Link>
                                    <span className='mx-1'>or</span>
                                    <Link to='/login' className='active:bg-transparent hover:text-white'>Log In</Link>
                                </div>
                            </div>
                        </Link>
                    </li>
                </div>
            </>
        }
    </>

    return (
        <div className='bg-[#081621]'>
            <div className='max-w-[1400px] mx-auto'>
                <div className="navbar justify-between">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-[#081621] rounded-box w-52"
                            >
                                {menuItems}
                            </ul>
                        </div>
                        <Link to='/' className="normal-case sm:text-3xl text-2xl font-semibold text-white">E-Buy</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul
                            tabIndex={0}
                            className="menu items-center menu-horizontal p-0"
                        >
                            {menuItems}
                        </ul>
                    </div>
                    <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-ghost lg:hidden text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;