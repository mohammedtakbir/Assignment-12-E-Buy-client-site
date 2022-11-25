import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import Loading from '../../components/Loading';
import { AuthContext } from '../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch(`http://localhost:5000/products?email=${user?.email}`)
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    };

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const handleDeleteProduct = (product) => {
        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success(`${product.model_name} is deleted successfully.`)
                    console.log(data);
                    setDeletingProduct(null);
                }
            })
    }

    return (
        <>
            <h2 className='text-2xl font-semibold my-5'>My Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Price</th>
                            <th>Price</th>
                            <th>Sales Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => (
                                <tr key={product._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={product.image} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.model_name}</td>
                                    <td>${product.resale_price}</td>
                                    <td>Available</td>
                                    <td>
                                        <button className='btn btn-sm'>Advertise</button>
                                    </td>
                                    <td>
                                        <label onClick={() => setDeletingProduct(product)} htmlFor="delete-modal" className="btn btn-sm bg-red-500 border-red-500 hover:border-red-500 hover:bg-red-500">Delete</label>
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