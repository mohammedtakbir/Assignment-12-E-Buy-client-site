import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../components/Loading';
import NewArrivalProduct from './NewArrivalProduct';

const NewArrivalProducts = () => {
    const { data: newArrivalProducts = [], isLoading } = useQuery({
        queryKey: ['newArrivalProducts'],
        queryFn: () => fetch(`http://localhost:5000/newArrivalProducts`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    };
    return (
        <div>
            <div className='container mx-auto sm:pt-16 pt-12 sm:pb-8 pb-5'>
                <div className='text-center md:mx-0 mx-3'>
                    <p className='text-sm text-blue-500'>Hurry up to buy!</p>
                    <h2 className='text-3xl mt-4 sm:mb-5 mb-4'>New Arrivals!!!</h2>
                    <h2 className='text-gray-500 text-sm'>Checkout our newest collection of products!</h2>
                </div>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 sm:mt-14 mt-10'>
                    {
                        newArrivalProducts.map(newArrivalProduct => <NewArrivalProduct
                            key={newArrivalProduct._id}
                            newArrivalProduct={newArrivalProduct}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default NewArrivalProducts;