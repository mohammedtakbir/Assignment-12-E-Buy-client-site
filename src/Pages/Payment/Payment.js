import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import { useTitle } from '../../Hooks/useTitle';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
    useTitle('Payment');
    const orderId = useParams();

    const { data: order = {}, isLoading } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/payment/${orderId.id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='border shadow-lg max-w-sm lg:mx-0 sm:mx-auto mx-3 p-4 rounded-md mt-[50px]'>
            <div className='mb-7'>
                <img src={order.image} className='w-200px h-[200px]' alt="" />
                <div className='mt-5'>
                    <h2 className='mb-2 font-semibold'>Product: {order.ProductName}</h2>
                    <h3 className='text-sm font-medium'>Price: ${order.price}</h3>
                </div>
            </div>
            <p className='mb-3'>
                <small className='text-gray-500'>Please Enter Your Card Number to Pay</small>
            </p>
            <Elements stripe={stripePromise} >
                <CheckoutForm order={order} />
            </Elements>
        </div>
    );
};

export default Payment;