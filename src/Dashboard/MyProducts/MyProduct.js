import React, { useEffect } from 'react';
import { useState } from 'react';
import SmallLoading from '../../components/SmallLoading';

const MyProduct = ({ product, i, handleAdvertiseItem, setDeletingProduct, advertise }) => {
    const [isAdvertise, setIsAdvertise] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`https://e-buy-phi.vercel.app/isAdvertise/${product._id}`)
            .then(res => res.json())
            .then(data => {
                setIsAdvertise(data?.isAdvertise);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, [product._id, advertise]);

    return (
        <>
            <tr>
                <th>{i + 1}</th>
                <td>
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src={product.image} alt='' />
                        </div>
                    </div>
                </td>
                <td className='font-medium'>{product.model_name}</td>
                <td className='font-medium'>${product.resale_price}</td>
                <td className='capitalize font-medium'>{product.status}</td>
                <td>
                    {loading ? <SmallLoading /> :
                        <button
                            onClick={() => handleAdvertiseItem(product)}
                            disabled={(((product.status === 'sold') && true) || (isAdvertise && true))}
                            className='btn btn-sm'>{isAdvertise ? 'Advertised' : 'Advertise'}
                        </button>}
                </td>
                <td>
                    <label
                        onClick={() => setDeletingProduct(product)}
                        htmlFor="delete-modal"
                        className="btn btn-sm bg-red-500 border-red-500 hover:border-red-500 hover:bg-red-500">
                        Delete
                    </label>
                </td>
            </tr>
        </>
    );
};

export default MyProduct;