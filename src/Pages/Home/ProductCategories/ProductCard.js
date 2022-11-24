import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { image,
        location,
        condition,
        mobile_number,
        description,
        name,
        original_price,
        post_time,
        purchase_year,
        resale_price,
        seller,
        year_of_use } = product
    return (
        <div>

            <Link to="" className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row hover:shadow-lg p-4 h-full">
                <img className="object-cover w-[300px] rounded-t-lg h-full md:rounded-none md:rounded-l-lg" src={image} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{name}</h5>
                    <p className="mb-3 font-normal">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
            </Link>

        </div>
    );
};

export default ProductCard;