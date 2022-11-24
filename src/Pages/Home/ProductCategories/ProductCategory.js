import React from 'react';
import { useParams } from 'react-router-dom';

const ProductCategory = () => {
    const brandName = useParams();
    
    return (
        <div>
            {brandName.brandName}
        </div>
    );
};

export default ProductCategory;