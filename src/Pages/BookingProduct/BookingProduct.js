import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../components/Loading';
import { useTitle } from '../../Hooks/useTitle';

const BookingPage = () => {
    const id = useParams();
    console.log(id.id)
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const { data: selectedProduct = [], isLoading } = useQuery({
        queryKey: ['selectedProducts', id.id],
        queryFn: () => fetch(`https://e-buy-phi.vercel.app/selectedProducts/${id.id}`)
            .then(res => res.json())
    })

    const { model_name, image, resale_price, _id, condition, color, storage, specification } = selectedProduct;
    //* work letter
    /* const {
        chipset,
        connectivity,
        contract,
        features,
        lock_status,
        manufacturer_warranty,
        model_number,
        network,
        operating_system,
        processor,
        ram,
        screen_size,
        sim_card_slot,
    }
        = specification; */

    useTitle(isLoading ? 'Loading' : `${model_name} - ${storage}GB`);

    const handleBooking = (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const name = user?.displayName;
        const email = user?.email;
        const phone = form.phone.value;
        const location = form.location.value;

        const booking = {
            ProductName: model_name,
            buyerName: name,
            price: resale_price,
            email,
            image: image,
            meeting_location: location,
            phone,
            productId: _id
        };

        fetch('https://e-buy-phi.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setLoading(false);
                    form.reset();
                    toast.success(`${model_name} is booked successfully!`)

                } else {
                    toast.error(data.message)
                    setLoading(false)
                }
            })
            .catch(err => setLoading(false))

    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <div className='mt-20 max-w-[800px] mx-auto'>
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className='border sm:h-[400px] h-[300px] flex items-center rounded-t-md'>
                            <img src={image} alt='' className='sm:h-[300px] h-[250px] sm:w-[400px] w-[300px] p-2' />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold capitalize">{model_name}</h1>
                            <p className='text-xs text-gray-600 mt-1'>FREE Next Day Express Delivery,FREE Returns,Great Price</p>
                            <hr />
                            <div className='mb-2'>
                                <p className='mt-2 text-sm'>Condition: <span className='font-semibold'>{condition}</span></p>
                                <p className='text-sm'>color: <span className='font-semibold'>{color}</span></p>
                                <p className='text-sm'>Storage: <span className='font-semibold'>{storage}GB</span></p>
                            </div>
                            <hr />
                            <p className="py-1 text-sm">Price: <span className='font-semibold sm:text-2xl text-xl'>${resale_price}</span></p>
                            <form onSubmit={handleBooking} className='mt-10'>
                                <p className='text-sm mb-1'>Please put your phone number and meeting location</p>
                                <input
                                    name='phone'
                                    type="text"
                                    placeholder="Phone Number"
                                    className="input input-bordered w-full mb-2 text-sm !h-10"
                                    required
                                />
                                <input
                                    name='location'
                                    type="text"
                                    placeholder="Meeting Location"
                                    className="input input-bordered w-full mb-2 text-sm !h-10"
                                    required
                                />
                                <button
                                    type='submit'
                                    className='text-white bg-gray-700 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'>
                                    {loading ? 'Loading...' : 'Add to Order'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {
                <div className='max-w-[1200px] xl:mx-auto mx-2 my-10 border p-3 rounded-sm'>
                    <h2 className='text-xl font-medium mb-5'>Description</h2>
                    <div className='lg:flex text-sm gap-5'>
                        <div className='lg:w-1/2'>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Condition:</p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.condition}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Model:</p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{model_name}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Color:</p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{color}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Lock Status: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.lock_status}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Network: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.network}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Operating system: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.operating_system}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Storage Capacity: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{storage}GB</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Connectivity: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.connectivity}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Manufacturer Warranty: </p>
                                <p className='lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.manufacturer_warranty}</p>
                            </div>
                        </div>
                        <div className='lg:w-1/2'>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Processor:</p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.processor}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Chipset:</p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.chipset}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Model Number:</p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.model_number}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Features: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.features}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Screen Size: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.screen_size} in</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>RAM: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.ram}GB</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>SIM Card Slot: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.sim_card_slot}</p>
                            </div>
                            <div className='flex'>
                                <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Contract: </p>
                                <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.contract}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default BookingPage;