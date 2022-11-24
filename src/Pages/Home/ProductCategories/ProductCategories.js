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
    if(isLoading){
        return <Loading />
    }

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