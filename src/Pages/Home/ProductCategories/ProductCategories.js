import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
    const categories = [
        {
            brandName: 'samsung',
            img: "https://m.media-amazon.com/images/I/519l80S-uLL._AC_SX522_.jpg"
        },
        {
            brandName: 'apple',
            img: "https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-Pro-Max-1.jpg"
        },
        {
            brandName: 'google',
            img: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-5-5g-1.jpg"
        }
    ]
    return (
        <div className='container mx-auto py-[50px]'>
            <h1 className='text-2xl font-medium mb-7'>Explore Popular Brands</h1>
            <div className='grid grid-cols-3'>
                {categories.map(category => (
                    <>
                        <Link to={`/category/${category.brandName}`} className='mx-2 uppercase hover:underline text-center font-medium'>
                            <img src={category.img} alt="" className='w-[200px] h-[200px] mx-auto mb-3' />
                            {category.brandName}</Link>
                    </>
                ))}
            </div>
        </div>
    );
};

export default ProductCategories;