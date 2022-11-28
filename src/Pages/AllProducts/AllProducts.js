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
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/products/${name.name}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
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
                <p className='text-center sm:text-3xl text-2xl sm:my-12 my-8 font-medium'>Hurry up to buy!</p>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 gap-0 gap-y-8 pb-20'>
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
                />
            }
        </>
    );
};

export default ProductCategory;