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

    useTitle(isLoading ? 'Loading' : `${model_name} - ${storage}`);

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
                    toast.error(data.message);
                    setLoading(false);
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
                                <p className='mt-2 text-sm capitalize'>Condition: <span className='font-semibold'>{condition}</span></p>
                                <p className='text-sm capitalize'>color: <span className='font-semibold'>{color}</span></p>
                                <p className='text-sm'>Storage(GB): <span className='font-semibold'>{storage}</span></p>
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
                                    className="input input-bordered w-full mb-4 text-sm !h-10"
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
            <div className='max-w-[1200px] xl:mx-auto mx-2 sm:my-20 my-10 border p-3 rounded-sm'>
                <h2 className='text-xl font-medium mb-5'>Description</h2>
                <div className='lg:flex text-sm gap-5'>
                    <div className='lg:w-1/2'>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Condition:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%] capitalize'>{selectedProduct?.condition}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Model:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%] capitalize'>{selectedProduct?.model_name}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Brand:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%] capitalize'>{selectedProduct?.brand}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Dimensions:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.Dimensions}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Weight:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.weight}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>SIM:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.SIM}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Display Technology:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.display_technology}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Display Size:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.display_size}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Display Resolution:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.display_resolution}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Processor:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.processor}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Chipset:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.chipset}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Internal Storage(GB):</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.storage}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Rear Camera(MP):</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.rear_camera}MP</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Front Camera(MP):</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.front_camera}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>3.5mm jack:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.headphone_jack}</p>
                        </div>
                    </div>
                    <div className='lg:w-1/2'>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Connectivity:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.connectivity}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>RAM(GB):</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.ram}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Sensors:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.sensors}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Battery:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.battery}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Operating System:</p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.operating_system}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Color: </p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{selectedProduct?.color}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Model Number: </p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.model_number}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Lock Status: </p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.lock_status}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>SIM Card Slot: </p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.features}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Manufacturer Warranty(Year): </p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%]'>{specification?.manufacturer_warranty}</p>
                        </div>
                        <div className='flex'>
                            <p className='mb-2 lg:w-[30%] sm:w-[25%] w-[40%]'>Region of Origin: </p>
                            <p className='mb-2 lg:w-[70%] sm:w-[75%] w-[60%] capitalize'>{specification?.region_of_origin}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingPage;