import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import Loading from '../../components/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import { useTitle } from '../../Hooks/useTitle';
import MyProduct from './MyProduct';

const MyProducts = () => {
    useTitle('My Products');
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [advertise, setAdvertise] = useState(false);

    const handleAdvertiseItem = (product) => {
        const advertisedProduct = { ...product, isAdvertise: true };
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
                    setAdvertise(!advertise)
                }
            })
    }



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

    return (
        <>
            <h2 className='sm:text-3xl text-2xl mb-3 mt-7 ml-3'>
                {products.length < 1 ? `You have not add any product yet` : products.length < 2 ? 'My Product' : 'My Products'}
            </h2>
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
                                <MyProduct
                                    i={i}
                                    product={product}
                                    key={product._id}
                                    advertise={advertise}
                                    handleAdvertiseItem={handleAdvertiseItem}
                                    setDeletingProduct={setDeletingProduct}

                                />
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