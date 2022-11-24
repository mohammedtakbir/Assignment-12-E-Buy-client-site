import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import ProductCard from './ProductCard';

const ProductCategory = () => {
    const brandName = useParams();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`http://localhost:5000/products/${brandName.brandName}`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    }
    
    return (
        <div className='container mx-auto'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-20'>
                {
                    products.map((product) => <ProductCard
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default ProductCategory;