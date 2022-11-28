import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <div className=' text-gray-700 items-center mt-[30px] xl:ml-[150px]'>
                <div className='sm:w-[500px] lg:mx-0 mx-auto text-center'>
                    <p className='mb-3 sm:text-4xl text-3xl font-semibold'>
                        <span className='mr-2'>Welcome</span>
                        <span>To</span>
                    </p>
                    <p className='sm:text-xl text-lg mb-2'>Your Dashboard</p>
                    <h2 className='sm:text-2xl text-xl font-medium'>{user.displayName}</h2>
                </div>
            </div>
        </>
    );
};

export default Dashboard;