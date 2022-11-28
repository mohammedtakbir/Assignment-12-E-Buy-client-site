import React from 'react';

const AdvertiseItem = ({ advertiseItem, setSelectedProduct }) => {
    const { image, model_name, resale_price } = advertiseItem;

    

    return (
        <div className='hover:shadow-xl duration-300 border border-gray-100 shadow-md cursor-pointer rounded-md text-center p-5 md:mx-0 mx-3'>
            <img src={image} className='w-[200px] h-[200px] mx-auto rounded-md' alt="" />
            <h2 className='font-medium mt-3 mb-2'>{model_name}</h2>
            <p className='text-blue-500 font-medium mb-1'>${resale_price}</p>
            <label onClick={() => setSelectedProduct(advertiseItem)} htmlFor="booking-modal" className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blgrayue-300">
                Book Now
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </label>
        </div>
    );
};

export default AdvertiseItem;