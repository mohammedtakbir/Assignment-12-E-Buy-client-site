import React from 'react';
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems';
import Banner from '../Banner/Banner';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    return (
        <>
            <Banner />
            <AdvertiseItems />
            <ProductCategories />
        </>
    );
};

export default Home;