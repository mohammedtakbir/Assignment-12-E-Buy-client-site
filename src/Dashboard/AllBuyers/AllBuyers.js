import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import Loading from '../../components/Loading';
import { useTitle } from '../../Hooks/useTitle';

const AllBuyers = () => {
    useTitle('All Buyers');
    const [deletingBuyer, setDeletingBuyer] = useState(null);
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/users/buyers?user=${'buyer'}`, {
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
        fetch(`https://e-buy-phi.vercel.app/users/sellers/${buyer._id}`, {
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
            <h2 className='sm:text-3xl text-2xl mb-3 mt-7 ml-3'>
            {buyers.length < 1 ? `No Buyer Found` : buyers.length < 2 ? 'Buyer' : 'All Buyers'}
            </h2>
            <div className="overflow-x-auto">
                <table className="table w-[900px]">
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