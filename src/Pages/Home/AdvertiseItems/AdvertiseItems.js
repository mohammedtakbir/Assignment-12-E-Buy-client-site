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
                <div className='max-w-[1300px] mx-auto sm:pt-16 pt-10 sm:pb-8 pb-5 px-3' id='offers'>
                    <div className='text-center'>
                        <p className='text-sm text-blue-500'>Discount Offer!</p>
                        <h2 className='text-3xl mt-4 sm:mb-5 mb-4'>Get Discount On These Products!!!</h2>
                        <h2 className='text-gray-500 text-sm'>Get 20% off your first purchase with E-Bay. Shop now to start saving!</h2>
                    </div>
                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 sm:mt-14 mt-10'>
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