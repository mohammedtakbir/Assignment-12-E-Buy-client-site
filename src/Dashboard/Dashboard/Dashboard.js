import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <div className=' text-gray-700 items-center mt-[30px] xl:ml-[150px]'>
                <div className='w-[500px] lg:mx-0 mx-auto text-center'>
                    <p className='mb-3'>
                        <span className='text-6xl font-bold mr-2'>Welcome</span>
                        <span className='text-6xl font-bold'>To</span>
                    </p>
                    <p className='text-3xl font-medium mb-2'>Your Dashboard</p>
                    <h2 className='text-3xl font-semibold'>{user.displayName}</h2>
                </div>
            </div>
        </>
    );
};

export default Dashboard;