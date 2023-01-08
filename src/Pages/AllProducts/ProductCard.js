import React from 'react';
import { Link } from 'react-router-dom';
import { HiCheckCircle } from "react-icons/hi";
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useState } from 'react';

const ProductCard = ({ product, setSelectedProduct }) => {
    const [reported, setReported] = useState('');
    const [isReported, setIsReported] = useState(false);
    const [loading, setLoading] = useState(false);

    const { image,
        brand,
        location,
        condition,
        mobile_number,
        description,
        model_name,
        original_price,
        post_time,
        purchase_year,
        resale_price,
        seller_name,
        seller_verify,
        year_of_use,
        storage,
        color } = product;

    const handleReportItem = (product) => {
        const reportedItem = { ...product, status: 'reported' };
        fetch('https://e-buy-phi.vercel.app/reportedItems', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(reportedItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setIsReported(!false);
                    toast.success('Reported this item successfully');
                }
            })
    }

    useEffect(() => {
        setLoading(true);
        fetch(`https://e-buy-phi.vercel.app/reportedItems/${product._id}`)
            .then(res => res.json())
            .then(data => {
                setReported(data.reportedStatus)
                setLoading(false)
            })
            .catch(err => setLoading(false));
    }, [product._id, isReported])

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md h-full p-5 xl:mx-0 mx-3">
                <Link href="#">
                    <img className="rounded-t-lg w-[250px] mx-auto" src={image} alt="" />
                </Link>
                <div className="p-1 mt-5">
                    <p className='text-xl font-semibold xl:mb-3 mb-2'>{model_name}</p>
                    <div className='xl:flex justify-between xl:mb-2'>
                        <p className='text-sm text-gray-500 xl:w-1/2 capitalize xl:mb-0 mb-1'>Brand: {brand}</p>
                        <p className='text-sm text-gray-500 xl:w-1/2 xl:mb-0 mb-1'>Condition: {condition}</p>
                    </div>
                    <div className='xl:flex justify-between xl:mb-2'>
                        <p className='text-sm text-gray-500 xl:w-1/2 capitalize xl:mb-0 mb-1'>Color: {color}</p>
                        <p className='text-sm text-gray-500 xl:w-1/2 xl:mb-0 mb-1'>Storage: {storage}</p>
                    </div>
                    <div className='xl:flex  justify-between xl:mb-2'>
                        <p className='text-sm text-gray-500 xl:w-1/2 xl:mb-0 mb-1'>Original Price: ${original_price}</p>
                        <p className='text-sm text-gray-500 xl:w-1/2 xl:mb-0 mb-1'>Resale Price: ${resale_price}</p>
                    </div>
                    <div className='xl:flex  justify-between mb-2 xl:mb-4'>
                        <p className='text-sm text-gray-500 xl:mb-0 mb-1'>Year of use: {year_of_use}</p>
                        <p className='text-sm text-gray-500 xl:w-1/2 xl:mb-0 mb-1'>Purchase Year: {purchase_year}</p>
                    </div>

                    <div className='xl:flex  justify-between'>
                        <p className='text-sm text-gray-500 xl:w-1/2 xl:mb-0 mb-1'>Seller: {seller_name} {seller_verify && <HiCheckCircle className='text-blue-500 text-lg inline' />}</p>
                        <p className='text-sm text-gray-500 xl:w-1/2 xl:mb-0 mb-1'>Mobile: {mobile_number}</p>
                    </div>
                    <p className='text-sm text-gray-500 xl:mb-0 mb-1'>Location: {location}</p>
                    <p className='text-sm text-gray-500'>Posted on: {post_time}</p>
                    <p className='text-sm text-gray-500 mt-3'>{description}</p>
                    <div className='flex justify-between items-center mt-7'>

                        <Link to={`/booking-page/${product._id}`}>
                            <button className='cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blgrayue-300'>
                                Book Now
                                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </Link>
                        {
                            loading ||
                            <button
                                disabled={reported && true}
                                onClick={() => handleReportItem(product)}
                                className={`btn btn-xs capitalize`}
                            >
                                {reported ? reported :
                                    'Report this item'}
                            </button>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;