import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../components/Loading';
import AdvertiseItem from './AdvertiseItem';

const AdvertiseItems = () => {

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
    }

    return (
        <>
            {advertiseItems.length > 0 &&
                <div className='container mx-auto py-16'>
                    <h2>Advertise Items</h2>
                    <div>
                        {
                            advertiseItems.map(advertiseItem => <AdvertiseItem
                                key={advertiseItem._id}
                                advertiseItem={advertiseItem}
                            />)
                        }
                    </div>
                </div>}
        </>
    );
};

export default AdvertiseItems;