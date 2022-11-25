import React from 'react';

const DeleteConfirmationModal = ({ modalData, closeModal, successAction, title }) => {
    return (
        <>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <div className="modal-action">
                        <label
                            onClick={() => successAction(modalData)}
                            htmlFor="confirmation-modal"
                            className="btn btn-sm border-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">Yes, I'm sure</label>
                        <button
                            className='btn btn-sm'
                            onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmationModal;