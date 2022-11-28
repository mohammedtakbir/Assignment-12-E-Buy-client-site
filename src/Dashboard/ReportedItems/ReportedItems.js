import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import Loading from '../../components/Loading';

const ReportedItems = () => {
    const [deleteReportedItem, setDeleteReportedItem] = useState(null);
    const { data: reportedItems = [], isLoading, refetch } = useQuery({
        queryKey: [''],
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/reportedItems`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading />
    }

    const handleDeleteReportedItem = (item) => {
        fetch(`https://e-buy-phi.vercel.app/reportedItems/${item._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    setDeleteReportedItem(null);
                    toast.success('Deleted Reported Item')
                    console.log(data);
                }
            })
    };

    const closeModal = () => {
        setDeleteReportedItem(null);
    };

    return (
        <>
            <h2 className='sm:text-3xl text-2xl mb-3 mt-7 ml-3'>Reported Items</h2>
            <div className="overflow-x-auto">
                <table className="table w-[800px]">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Image</th>
                            <th>Name</th>
                            <th>Delete Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems.map((reportedItem, i) => (
                                <tr key={reportedItem._id} className='hover'>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-24 rounded-xl">
                                                <img src={reportedItem.image} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{reportedItem.model_name}</td>
                                    <td>
                                        <label
                                            onClick={() => setDeleteReportedItem(reportedItem)}
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
            {deleteReportedItem &&
                <DeleteConfirmationModal
                    title={`Are you sure you want to delete this Items?`}
                    closeModal={closeModal}
                    modalData={deleteReportedItem}
                    successAction={handleDeleteReportedItem}
                />
            }
        </ >
    );
};

export default ReportedItems;