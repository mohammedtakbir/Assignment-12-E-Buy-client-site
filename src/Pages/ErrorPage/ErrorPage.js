import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/404_page_cover.jpg'

const ErrorPage = () => {
    return (
        <>
            <div className='flex justify-center mt-[100px] md:mx-0 mx-2'>
                <img src={errorImage} alt="" className='rounded-lg' />
            </div>
            <div className='flex justify-center mt-5'>
                <Link to='/'>
                    <button className='sm:py-3 sm:px-4 py-2 px-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold'>Back to Home Page</button>
                </Link>
            </div>
        </>
    );
};

export default ErrorPage;