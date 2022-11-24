import React from 'react';

const Banner = () => {
    return (
        <div className='bg-gray-50'>
            <div className="relative flex flex-col lg:pt-0 lg:flex-col lg:pb-0 container mx-auto">
                <div className="flex flex-col items-start w-full max-w-xl px-4 mx-auto lg:px-8 lg:max-w-screen-xl">
                    <div className="mb-16  lg:max-w-lg lg:pr-5">
                        <div className="max-w-xl pt-24 mb-6">
                            <h2 className="leading-9 max-w-lg mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Up to 50% Off on <br /> this Black Friday!
                            </h2>
                            <p className="text-gray-700 md:text-lg text-sm">
                            Plus free shipping! Use code:takbir123
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:flex-row">
                            <button className='btn'>Shop Now</button>
                        </div>
                    </div>
                </div>
                <div className="inset-y-0 right-0 w-full max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
                    <img
                        className="object-cover w-full rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full"
                        src="https://assets.reedpopcdn.com/Phone-Deals.png/BROK/resize/1200x1200%3E/format/jpg/quality/70/Phone-Deals.png?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};
// https://www.gannett-cdn.com/presto/2021/11/22/USAT/09a0849b-1dbb-46af-b8db-4de7df4770b9-Smart_phone_mini_round_up.png
export default Banner;