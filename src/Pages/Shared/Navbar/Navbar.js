import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, userSignOut } = useContext(AuthContext);

    const handleSignOut = () => {
        userSignOut()
            .then(() => {
                toast.success('Sign Out Successfully')
            })
            .catch(err => {})
    }

    const menuItems = <>
        <li>
            <Link to='/' className='active:bg-gray-200 text-black'>Home</Link>
        </li>
        <li>
            <Link to='/blogs' className='active:bg-gray-200 text-black'>Blogs</Link>
        </li>
        {user?.uid ?
            <>
                <li>
                    <Link to='/dashboard' className='active:bg-gray-200 text-black'>Dashboard</Link>
                </li>
                <li>
                    <button onClick={handleSignOut} className='active:bg-gray-200 text-black'>Sign Out</button>
                </li>
            </>
            :
            <>
                <li>
                    <Link to='/login' className='active:bg-gray-200 text-black'>Log In</Link>
                </li>
                <li>
                    <Link to='/signup' className='active:bg-gray-200 text-black'>Sign Up</Link>
                </li>
            </>
        }
    </>

    return (
        <div className='bg-gray-100'>
            <div className='container mx-auto'>
                <div className="navbar justify-between">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {menuItems}
                            </ul>
                        </div>
                        <Link to='/' className="normal-case text-2xl font-semibold">E-Buy</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {menuItems}
                        </ul>
                    </div>
                    <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;