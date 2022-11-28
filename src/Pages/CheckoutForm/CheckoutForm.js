import React, { useEffect, useState } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [success, setSuccess] = useState('');
    const { price, ProductName, email, _id, productId, buyerName, phone } = order;


    useEffect(() => {
        fetch("https://e-buy-phi.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        };
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        };
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setPaymentError(error.message)
        } else {
            setPaymentError('');
        }
        setSuccess('');
        setLoading(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: ProductName,
                        email: email
                    },
                },
            },
        );
        if (confirmError) {
            setLoading();
            setPaymentError(confirmError.message);
            return;
        }
        if (paymentIntent.status === 'succeeded') {
            const payment = {
                email,
                price,
                phone,
                buyerName,
                ProductName,
                orderId: _id,
                transactionId: paymentIntent.id
            }

            //* store payment info in the database
            fetch(`https://e-buy-phi.vercel.app/payments/${productId}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setSuccess('Congrats! Your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })
        }
        setLoading(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || loading} className='btn btn-sm mt-5'>
                    {loading ? 'Loading...' : 'Pay'}
                </button>
            </form>
            <div className='text-sm'>
                <p className='text-red-500 mt-1'>
                    <small>{paymentError}</small>
                </p>
                {
                    success && <div>
                        <p className='text-green-500'>{success}</p>
                        <p>Your TractionId: <span className='font-semibold'>{transactionId}</span></p>
                    </div>
                }
            </div>
        </>
    );
};

export default CheckoutForm;