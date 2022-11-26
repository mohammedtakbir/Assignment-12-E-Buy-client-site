import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({ selectedProduct, closeModal }) => {
    const { user } = useContext(AuthContext)
    const { model_name, resale_price, image, _id } = selectedProduct;

    const handleBooking = (e) => {

        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            ProductName: model_name,
            buyerName: name,
            price: resale_price,
            email,
            phone,
            meeting_location: location,
            image: image,
            productId: _id
        };

        closeModal();

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success(`${model_name} is booked successfully!`)

                } else {
                    toast.error(data.message)
                }
            })

    };

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={closeModal} htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-6">{model_name}</h3>
                    <form onSubmit={handleBooking}>
                        <input
                            disabled
                            defaultValue={user?.displayName}
                            name='name'
                            type="text"
                            placeholder="Full Name"
                            className="input input-bordered w-full mb-4"
                        />
                        <input
                            type="text"
                            name="price"
                            id=""
                            disabled
                            className='input input-bordered w-full mb-4'
                            defaultValue={`Price: $${resale_price}`}
                        />
                        <input
                            disabled
                            defaultValue={user?.email}
                            name='email'
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full mb-4"
                        />
                        <input
                            name='phone'
                            type="text"
                            placeholder="Phone Number"
                            className="input input-bordered w-full mb-4"
                            required
                        />
                        <input
                            name='location'
                            type="text"
                            placeholder="Meeting Location"
                            className="input input-bordered w-full mb-4"
                            required
                        />
                        <input
                            type="submit"
                            value="SUBMIT"
                            className='w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;