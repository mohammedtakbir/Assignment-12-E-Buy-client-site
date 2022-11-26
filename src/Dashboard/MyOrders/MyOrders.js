import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { AuthContext } from '../../contexts/AuthProvider';

const Orders = () => {
    const { user, userSignOut } = useContext(AuthContext);

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: () => fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    userSignOut()
                }
                return res.json();
            })
    })
    if (isLoading) {
        return <Loading />
    }

    console.log(orders)

    return (
        <div>
            <h2 className='text-2xl font-semibold my-5'>My Orders</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, i) => (
                                <tr key={order._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={order.image} alt='' />
                                            </div>
                                        </div>

                                    </td>
                                    <td>{order.ProductName}</td>
                                    <td>${order.price}</td>
                                    <td>
                                        {order.paid ?
                                            <span className='text-green-500'>Paid</span> :
                                            <Link to={`/dashboard/payment/${order._id}`}>

                                                <button className='btn btn-sm'>Pay</button>
                                            </Link>}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;