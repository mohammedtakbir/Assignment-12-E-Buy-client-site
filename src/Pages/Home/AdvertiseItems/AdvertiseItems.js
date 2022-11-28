import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../../components/Loading';
import BookingModal from '../../BookingModal/BookingModal';
import AdvertiseItem from './AdvertiseItem';

const AdvertiseItems = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { data: advertiseItems = [], isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/advertise`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    };

    const closeModal = () => {
        setSelectedProduct(null);
    }

    return (
        <>
            {advertiseItems.length > 0 &&
                <div className='container mx-auto pt-16 sm:pb-8 pb-5'>
                    <div className='text-center md:mx-0 mx-3'>
                        <p className='text-sm text-blue-500'>Discount Offer!</p>
                        <h2 className='text-3xl mt-4 sm:mb-5 mb-4'>Get Discount On These Products!!!</h2>
                        <h2 className='text-gray-500 text-sm'>Get 20% off your first purchase with E-Bay. Shop now to start saving!</h2>
                    </div>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 sm:mt-14 mt-10'>
                        {
                            advertiseItems.map(advertiseItem => <AdvertiseItem
                                key={advertiseItem._id}
                                advertiseItem={advertiseItem}
                                setSelectedProduct={setSelectedProduct}
                            />)
                        }
                    </div>
                </div>
            }
            {selectedProduct &&
                <BookingModal
                    closeModal={closeModal}
                    selectedProduct={selectedProduct}
                />
            }
        </>
    );
};

export default AdvertiseItems;