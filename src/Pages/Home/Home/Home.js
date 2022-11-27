import React from 'react';
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems';
import Banner from '../Banner/Banner';
import ProductCategories from '../ProductCategories/ProductCategories';
import QualityGoods from '../QualityFeatures/QualityFeatures';

const Home = () => {
    return (
        <>
            <Banner />
            <AdvertiseItems />
            <ProductCategories />
            <QualityGoods />
        </>
    );
};

export default Home;