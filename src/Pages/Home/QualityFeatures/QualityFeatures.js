import React from 'react';
import Feature from './Feature';

const QualityFeatures = () => {

    const features = [
        {
            image: 'https://img.freepik.com/free-vector/delivery-staff-ride-motorcycles-shopping-concept_1150-34879.jpg?w=2000',
            qualityFeature: 'Fast Delivery',
            description: "The faster you can get your product to the customer, the higher the chances of purchasing."
        },
        {
            image: 'https://www.citypng.com/public/uploads/preview/hd-blue-thumbs-up-like-icon-png-216354170086lwtuibsn2.png',
            qualityFeature: 'Best Quality',
            description: "Quality is remembered long after the price is forgotten. It's always easier to make quality product rather than explaining why the product is without quality."
        },
        {
            image: 'https://cdn-icons-png.flaticon.com/512/1482/1482538.png',
            qualityFeature: 'Free Return',
            description: "To keep customers satisfied and guarantee that they will buy from you again, having an excellent shipping and returns policy is vital."
        },
    ]

    return (
        <div className='container mx-auto sm:pb-[60px] pb-[40px] lg:pt-[40px] pt-0'>
            <div className='text-center md:mx-0 mx-3'>
                <p className='text-blue-500 text-sm'>There are some redeeming factors</p>
                <h3 className='sm:text-3xl text-2xl mt-4 mb-5'>We Provide High Quality Goods</h3>
                <p className='text-gray-500 text-sm'>A client that's unhappy for a reason is a problem, a client that's unhappy though he or her can't</p>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-10 gap-8 sm:mt-14 mt-10'>
                    {
                        features.map((feature, i) => <Feature
                            key={i}
                            feature={feature}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default QualityFeatures;