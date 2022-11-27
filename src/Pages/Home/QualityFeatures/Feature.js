import React from 'react';

const Feature = ({ feature }) => {
    const { image, qualityFeature, description } = feature;
    return (
        <>
            <div>
                <img src={image} alt="" className='w-[200px] h-[180px] mx-auto rounded-xl mb-7' />
                <h2 className='font-medium text-xl mb-3'>{qualityFeature}</h2>
                <p className='text-sm text-gray-500'>{description}</p>
            </div>
        </>
    );
};

export default Feature;