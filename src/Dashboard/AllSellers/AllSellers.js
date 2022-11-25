import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import Loading from '../../components/Loading';

const AllSellers = () => {
    const [deletingSeller, setDeletingSeller] = useState(null);
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => fetch(`http://localhost:5000/users/sellers?user=${'seller'}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading />
    }

    const closeModal = () => {
        setDeletingSeller(null);
    };

    const handleDeleteSeller = (seller) => {
        fetch(`http://localhost:5000/users/sellers/${seller._id}`, {
            method: 'DELETE',   
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success(`${seller.name} is deleted successfully.`)
                    console.log(data);
                    setDeletingSeller(null);
                }
            })
    }

    return (
        <>
            <h2 className='text-2xl font-semibold my-4'>All Sellers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller, i) => (
                            <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    <label onClick={() => setDeletingSeller(seller)} htmlFor="delete-modal" className="btn btn-sm bg-red-500 border-red-500 hover:border-red-500 hover:bg-red-500">Delete</label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deletingSeller &&
                <DeleteConfirmationModal
                    title={`Are you sure you want to delete this Seller?`}
                    closeModal={closeModal}
                    modalData={deletingSeller}
                    successAction={handleDeleteSeller}
                />
            }
        </>
    );
};

export default AllSellers;