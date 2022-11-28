import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading';

const ProductCategories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['productCategories'],
        queryFn: () => fetch(`http://localhost:5000/productCategories`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='container mx-auto py-[50px]'>
            <h1 className='text-2xl font-medium mb-12'>Explore Popular Brands</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                {categories.map((category) => (

                    <Link key={category._id} to={`/category/${category.name}`} className='mx-2 uppercase hover:underline text-center font-medium'>
                        <img src={category.img} alt="" className='w-[200px] h-[200px] mx-auto mb-3' />
                        {category.name}</Link>

                ))}
            </div>
        </div>
    );
};

export default ProductCategories;