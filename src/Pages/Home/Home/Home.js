import React from 'react';
import { useTitle } from '../../../Hooks/useTitle';
import AdvertiseItems from '../AdvertiseItems/AdvertiseItems';
import Banner from '../Banner/Banner';
import NewArrivalProducts from '../NewArrivalProducts/NewArrivalProducts';
import ProductCategories from '../ProductCategories/ProductCategories';
import QualityFeatures from '../QualityFeatures/QualityFeatures';

const Home = () => {
    useTitle('Home');
    return (
        <>
            <Banner />
            <NewArrivalProducts />
            <AdvertiseItems />
            <ProductCategories />
            <QualityFeatures />
        </>
    );
};

export default Home;