import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
    return (
        <>
            {/* <div className='bg-gray-50'>
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
            </div> */}

            <section className='py-[50px] max-w-[1300px] mx-auto px-5 md:block hidden'>
                <div>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper h-[600px] relative"
                    >
                        <SwiperSlide>
                            <img
                                src='https://i.ibb.co/HtThtD6/best-camera-phones-hero-2.jpg'
                                className='w-full h-full lg:object-fill md:object-cover object-fill'
                                alt=""
                            />
                            <div className='absolute bottom-[35%] left-16'>
                                <h2 className='text-4xl font-semibold text-white mb-3'>Kick off the year with new tech</h2>
                                <p className='text-white mb-3'>Everything you need to help you succeed.</p>
                                <a
                                    href='#popular-products'
                                    className='inline-block border-2 border-gray-600 focus:outline-none hover:bg-gray-100 hover:text-black focus:ring-4 focus:ring-gray-200 focus:bg-white focus:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                             '>
                                    Shop Now
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://i.ibb.co/P1wCYtd/Screenshot-82.png"
                                className='w-full h-full lg:object-fill md:object-cover object-fill'
                                alt=""
                            />
                            <div className='absolute bottom-[35%] left-16'>
                                <h2 className='text-4xl font-semibold text-white mb-3'>Kick off the year with new tech</h2>
                                <p className='text-white mb-3'>Everything you need to help you succeed.</p>
                                <a
                                    href='#popular-products'
                                    className='inline-block border-2 border-gray-600 focus:outline-none hover:bg-gray-100 hover:text-black focus:ring-4 focus:ring-gray-200 focus:bg-white focus:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                             '>
                                    Shop Now
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src='https://i.ibb.co/pnH5cGR/Screenshot-81.png'
                                className='w-full h-full lg:object-fill md:object-cover object-fill'
                                alt=""
                            />
                            <div className='absolute bottom-[35%] left-16'>
                                <h2 className='text-4xl font-semibold text-white mb-3'>Kick off the year with new tech</h2>
                                <p className='text-white mb-3'>Everything you need to help you succeed.</p>
                                <a
                                    href='#popular-products'
                                    className='inline-block border-2 text-white border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-black focus:ring-4 focus:ring-gray-200 focus:bg-white focus:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                             '>
                                    Shop Now
                                </a>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
            <section className='container mx-auto my-10 px-5 md:hidden block'>
                <div>
                    <h2 className='text-2xl font-semibold'>Up to 40% OFF. Kick of the year with new tech!</h2>
                    <p className='text-sm mb-4 mt-2'>Everything you need to know help you succeed.</p>
                    <a
                        href='#popular-products'
                        className='inline-block border-2 border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-black focus:ring-4 focus:ring-gray-200 focus:bg-white focus:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                             '>
                        Shop Now
                    </a>
                </div>
            </section>
        </>
    );
};
export default Banner;