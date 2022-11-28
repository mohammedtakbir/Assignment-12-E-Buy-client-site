import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../../components/Loading';
import BookingModal from '../../BookingModal/BookingModal';
import AdvertiseItem from './AdvertiseItem';

const AdvertiseItems = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { data: advertiseItems = [], isLoading } = useQuery({
        queryKey: ['advertise'],
        queryFn: () => fetch(`http://localhost:5000/advertise`, {
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
                <div className='container mx-auto py-16'>
                    <div className='text-center'>
                        <p className='text-sm text-blue-500'>Learn how to get a discount</p>
                        <h2 className='text-3xl mt-4 mb-5'>Most Popular Products</h2>
                        <h2 className='text-gray-500 text-sm'>Proponents of content strategy may shun of dummy copy designers</h2>
                    </div>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 mt-14'>
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