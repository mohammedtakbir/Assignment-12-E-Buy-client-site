import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useTitle } from '../../Hooks/useTitle';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from './ProductCard';

const ProductCategory = () => {
    useTitle('Popular Products');
    const name = useParams();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortValue, setSortValue] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(`https://e-buy-phi.vercel.app/products?name=${name.name}&sort=${sortValue}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setProducts(data);
            })
            .catch(err => setLoading(false))
    }, [name.name, sortValue])

    const closeModal = () => {
        setSelectedProduct(null);
    }

    const handleGetSortValue = (e) => {
        setSortValue(e.target.value.toLowerCase());
    }

    //* work letter
    /* const highestPrice =Math.max(...products.map(product => product.resale_price));

    const [range, setRange] = useState(highestPrice);

    const handleRange = (value) => {
        setRange(parseFloat(value));
    } */

    /* const handleSearch = (searchText) => {
        setSearch(searchText)
    } */

    const handleTextSearch = (e) => {
        setLoading(true);
        e.preventDefault();
        const searchText = e.target.search.value;

        fetch(`https://e-buy-phi.vercel.app/searchProducts?search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setProducts(data);
            })
            .catch(err => setLoading(false))
    };

    return (
        <>
            <div className='container mx-auto'>
                <p className='text-center sm:text-3xl text-2xl sm:my-12 my-8 font-medium'>Hurry up to buy!</p>
                <div className='flex justify-between items-center mb-3'>
                    <>
                        <div className='flex items-center'>
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 mr-3">Sort By: </label>
                            <select
                                onChange={handleGetSortValue}
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                            >
                                <option value='default'>Default</option>
                                <option value='lowToHigh'>{`Price (Low > High)`}</option>
                                <option value='highToLow'>{`Price (High > Low)`}</option>
                            </select>
                        </div>
                    </>
                    {/* //* work letter */}
                    {/* <div>
                    <input onChange={(e) => handleRange(e.target.value)} type="range" min="0" max={highestPrice} value={range} className="range range-xs " />
                </div> */}
                    <form className='w-[400px] flex gap-2' onSubmit={handleTextSearch}>
                        <div className="relative w-[350px]">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input
                                // onChange={(e) => handleSearch(e.target.value)}
                                type="search"
                                id="default-search"
                                name='search'
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
                                placeholder="Search Products..."
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="text-white right-2.5 bottom-0 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                {loading ? <Loading /> :
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 gap-0 gap-y-8 pb-20'>
                        {
                            products.map((product) => <ProductCard
                                key={product._id}
                                product={product}
                                setSelectedProduct={setSelectedProduct}
                            />)
                        }
                    </div>}
            </div>
            {selectedProduct &&
                <BookingModal
                    closeModal={closeModal}
                    selectedProduct={selectedProduct}
                />
            }
        </>
    );
};

export default ProductCategory;