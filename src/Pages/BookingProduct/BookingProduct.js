import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../components/Loading';
import { useTitle } from '../../Hooks/useTitle';

const BookingPage = () => {
    const id = useParams();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const { data: selectedProduct = [], isLoading } = useQuery({
        queryKey: ['selectedProducts', id.id],
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/selectedProducts/${id.id}`)
            .then(res => res.json())
    })

    const { model_name, image, resale_price, _id, condition, color, storage } = selectedProduct;
    useTitle(isLoading ? 'Loading' : `${model_name} - ${storage}GB`);
    const handleBooking = (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const name = user?.displayName;
        const email = user?.email;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            ProductName: model_name,
            buyerName: name,
            price: resale_price,
            email,
            image: image,
            meeting_location: location,
            phone,
            productId: _id
        };

        fetch('https://e-buy-phi.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoading(false);
                    form.reset();
                    toast.success(`${model_name} is booked successfully!`)

                } else {
                    toast.error(data.message)
                    setLoading(false)
                }
            })
            .catch(err => setLoading(false))

    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='my-20 max-w-[800px] mx-auto'>

            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='border sm:h-[400px] h-[300px] flex items-center rounded-t-md'>
                        <img src={image} alt='' className='sm:h-[300px] h-[250px] sm:w-[400px] w-[300px] p-2' />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold capitalize">{model_name}</h1>
                        <p className='text-xs text-gray-600 mt-1'>FREE Next Day Express Delivery,FREE Returns,Great Price</p>
                        <hr />
                        <div className='mb-2'>
                            <p className='mt-2 text-sm'>Condition: <span className='font-semibold'>{condition}</span></p>
                            <p className='text-sm'>color: <span className='font-semibold'>{color}</span></p>
                            <p className='text-sm'>Storage: <span className='font-semibold'>{storage}GB</span></p>
                        </div>
                        <hr />
                        <p className="py-1 text-sm">Price: <span className='font-semibold text-2xl'>${resale_price}</span></p>

                        <form onSubmit={handleBooking} className='mt-10'>
                            <p className='text-sm mb-1'>Please put your phone number and meeting location</p>
                            <input
                                name='phone'
                                type="text"
                                placeholder="Phone Number"
                                className="input input-bordered w-full mb-2"
                                required
                            />
                            <input
                                name='location'
                                type="text"
                                placeholder="Meeting Location"
                                className="input input-bordered w-full mb-2"
                                required
                            />
                            <button
                                type='submit'
                                className='text-white bg-gray-700 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'>
                                    {loading ? 'Loading...' : 'Add to Order'}
                                    
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BookingPage;