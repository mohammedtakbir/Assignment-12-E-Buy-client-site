import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import Loading from '../../components/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import { useTitle } from '../../Hooks/useTitle';

const MyProducts = () => {
    useTitle('My Products');
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [advertise, setAdvertise] = useState(false);

    const handleAdvertiseItem = (product) => {

        const advertisedProduct = { ...product, isAdvertise: true }
        fetch('https://e-buy-phi.vercel.app/advertise', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(advertisedProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`This product is Advertised`);
                    // setIsAdvertise(true);
                }
            })
    }

    //* work letter
    /* useEffect(() => {
        setLoading(true);
        fetch(`https://e-buy-phi.vercel.app/advertise/`)
            .then(res => res.json())
            .then(data => {
                setAdvertise(data.reportedStatus)
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, [])
 */

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/products?email=${user?.email}`, {
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
        setDeletingProduct(null);
    }

    const handleDeleteProduct = (product) => {
        fetch(`https://e-buy-phi.vercel.app/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success(`${product.model_name} is deleted successfully.`)
                    setDeletingProduct(null);
                }
            })
    };

    console.log(products)

    return (
        <>
            <h2 className='sm:text-3xl text-2xl mb-3 mt-7 ml-3'>My Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Model Name</th>
                            <th>Price</th>
                            <th>Sales Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, i) => (
                                <tr key={product._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={product.image} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-medium'>{product.model_name}</td>
                                    <td className='font-medium'>${product.resale_price}</td>
                                    <td className='capitalize font-medium'>{product.status}</td>
                                    <td>
                                        <button
                                            onClick={() => handleAdvertiseItem(product)}
                                            disabled={(product.status === 'sold') && true}
                                            className='btn btn-sm'>{'Advertise'}</button>
                                    </td>
                                    <td>
                                        <label
                                            onClick={() => setDeletingProduct(product)}
                                            htmlFor="delete-modal"
                                            className="btn btn-sm bg-red-500 border-red-500 hover:border-red-500 hover:bg-red-500">
                                            Delete
                                        </label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {deletingProduct &&
                <DeleteConfirmationModal
                    title={`Are you sure you want to delete this Product?`}
                    closeModal={closeModal}
                    modalData={deletingProduct}
                    successAction={handleDeleteProduct}
                />}
        </>
    );
};

export default MyProducts;