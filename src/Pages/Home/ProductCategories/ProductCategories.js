import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';

const ProductCategories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['productCategories'],
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/productCategories`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    }

    return (
        <section className='max-w-[1450px] mx-auto sm:py-[60px] py-[30px] px-3' id='popular-brands'>
            <h1 className='sm:text-3xl text-2xl sm:mb-14 mb-10 text-center'>Explore Popular Brands</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                {categories.map((category) => (
                    <Link
                        key={category._id}
                        to={`/category/${category.name}`}
                        className='md:mb-0 mb-5 mx-2 uppercase hover:underline text-center font-medium'
                    >
                        <img
                            src={category.img}
                            alt=""
                            className='w-[200px] h-[200px] mx-auto mb-3'
                        />
                        {category.name}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProductCategories;