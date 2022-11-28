import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import Loading from '../../components/Loading';

const AllBuyers = () => {
    const [deletingBuyer, setDeletingBuyer] = useState(null);
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => fetch(`http://localhost:5000/users/buyers?user=${'buyer'}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading />
    }

    const closeModal = () => {
        setDeletingBuyer(null);
    };

    const handleDeleteBuyer = (buyer) => {
        fetch(`http://localhost:5000/users/sellers/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success(`${buyer.name} is deleted successfully.`)
                    setDeletingBuyer(null);
                }
            })
    }

    return (
        <>
            <h2 className='text-2xl font-semibold my-4'>All Buyers</h2>
            <div className="overflow-x-auto">
                <table className="table w-[1000px]">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buyers.map((buyer, i) => (
                            <tr key={buyer._id}>
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>
                                    <label onClick={() => setDeletingBuyer(buyer)} htmlFor="delete-modal" className="btn btn-sm bg-red-500 border-red-500 hover:border-red-500 hover:bg-red-500">Delete</label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deletingBuyer &&
                <DeleteConfirmationModal
                    title={`Are you sure you want to delete this Seller?`}
                    closeModal={closeModal}
                    modalData={deletingBuyer}
                    successAction={handleDeleteBuyer}
                />
            }
        </>
    );
};

export default AllBuyers;