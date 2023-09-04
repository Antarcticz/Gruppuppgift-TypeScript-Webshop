import React from 'react'

interface props {
    product: Product;
}

const Card: React.FC<props> = ({ product }) => {
    return <div>
        <p>
            {product.productName}
        </p>
    </div>
}

export default Card