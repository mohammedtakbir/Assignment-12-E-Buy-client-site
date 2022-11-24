import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
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
    console.log(products);
    return (
        <div className='container mx-auto'>
            {brandName.brandName}
            {products.length}
            <div className='grid grid-cols-2 gap-6 py-20'>
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