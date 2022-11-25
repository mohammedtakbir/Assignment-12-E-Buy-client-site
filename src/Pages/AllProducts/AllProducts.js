import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from './ProductCard';

const ProductCategory = () => {
    const name = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', name],
        queryFn: () => fetch(`http://localhost:5000/products/${name.name}`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    }
    const closeModal = () => {
        setSelectedProduct(null);
    }
    return (
        <>
            <div className='container mx-auto'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-20'>
                    {
                        products.map((product) => <ProductCard
                            key={product._id}
                            product={product}
                            setSelectedProduct={setSelectedProduct}
                        />)
                    }
                </div>
            </div>
            {selectedProduct &&
                <BookingModal
                    closeModal={closeModal}
                    selectedProduct={selectedProduct}
                />}
        </>
    );
};

export default ProductCategory;