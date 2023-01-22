import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useTitle } from '../../Hooks/useTitle';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from './ProductCard';

const ProductCategory = () => {
    useTitle('Popular Products');
    const name = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortValue, setSortValue] = useState('');
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', name, sortValue],
        queryFn: () => fetch(`http://localhost:5000/products?name=${name.name}&sort=${sortValue}`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    }
    const closeModal = () => {
        setSelectedProduct(null);
    }

    const handleGetSortValue = (e) => {
        e.preventDefault();
        setSortValue(e.target.value.toLowerCase());
        refetch();
    }

    return (
        <>
            <div className='container mx-auto'>
                <p className='text-center sm:text-3xl text-2xl sm:my-12 my-8 font-medium'>Hurry up to buy!</p>
                <div className='mb-2'>
                    <div className='flex items-center'>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 mr-3">Sort By: </label>
                        <select
                            onChange={handleGetSortValue}
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                        >
                            <option selected value='default'>Default</option>
                            <option value='lowToHigh'>{`Price (Low > High)`}</option>
                            <option value='highToLow'>{`Price (High > Low)`}</option>
                        </select>
                    </div>
                </div>
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