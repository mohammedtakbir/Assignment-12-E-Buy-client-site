import React from 'react';
import { Link } from 'react-router-dom';
import { HiCheckCircle } from "react-icons/hi";

const ProductCard = ({ product, setSelectedProduct }) => {
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
        seller,
        year_of_use } = product
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md h-full p-5">
                <Link href="#">
                    <img className="rounded-t-lg w-[250px] mx-auto" src={image} alt="" />
                </Link>
                <div className="p-1 mt-5">
                    <p className='text-xl font-semibold mb-4'>{model_name}</p>
                    <div className='lg:flex justify-between mb-2'>
                        <p className='text-sm text-gray-500 lg:w-1/2'>Brand Name: {brand}</p>
                        <p className='text-sm text-gray-500 lg:w-1/2'>Seller: {seller.name} {seller.verify ? <HiCheckCircle className='text-blue-500 text-lg inline' /> : ''}</p>
                    </div>
                    <div className='lg:flex  justify-between mb-2'>
                        <p className='text-sm text-gray-500 lg:w-1/2'>Condition: {condition}</p>
                        <p className='text-sm text-gray-500 lg:w-1/2'>Purchase Year: {purchase_year}</p>
                    </div>
                    <div className='lg:flex  justify-between mb-2'>
                        <p className='text-sm text-gray-500 lg:w-1/2'>Original Price: ${original_price}</p>
                        <p className='text-sm text-gray-500 lg:w-1/2'>Resale Price: ${resale_price}</p>
                    </div>
                    <div className='lg:flex  justify-between mb-4 w-1/2'>
                        <p className='text-sm text-gray-500'>Year of use: {year_of_use}</p>
                    </div>
                    <div className='lg:flex  justify-between mb-2'>
                        <p className='text-sm text-gray-500 lg:w-1/2'>Location: {location}</p>
                        <p className='text-sm text-gray-500 lg:w-1/2'>Mobile: {mobile_number}</p>
                    </div>
                    <p className='text-sm text-gray-500'>Posted on: {post_time}</p>
                    <p className='text-sm text-gray-500 mt-5'>{description}</p>
                    <label onClick={() => setSelectedProduct(product)} htmlFor="booking-modal" className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blgrayue-300 mt-7">
                        Book Now
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </label>
                </div>
            </div>
        </>
    );
};

export default ProductCard;