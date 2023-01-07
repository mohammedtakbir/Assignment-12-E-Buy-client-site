import React from 'react';

const Banner = () => {
    return (
        <div className='bg-gray-50'>
            <div className="container px-6 sm:py-16 py-10 mx-auto text-center">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">Get up to 50% Off on this Black Friday!</h1>
                    <p className="mt-6 text-gray-500">We're bringing you all the best Black Friday phone deals, so you can just keep an eye on this page.</p>
                    <a href='#popular-products' className="px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-gray-700 rounded-lg hover:bg-gray-800 lg:mx-0 lg:w-auto focus:outline-none inline-block">
                        Shop Now
                    </a>
                </div>

                <div className="flex justify-center mt-10">
                    <img className="object-cover w-full h-[600px] rounded-xl lg:w-4/5" src="https://assets.reedpopcdn.com/Phone-Deals.png/BROK/resize/1200x1200%3E/format/jpg/quality/70/Phone-Deals.png" alt='/' />
                </div>
            </div>
        </div>
    );
};
export default Banner;