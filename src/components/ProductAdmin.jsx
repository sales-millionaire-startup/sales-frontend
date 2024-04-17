import React from "react"

const Product = ({ product }) => {
    return (
      <div className="product">
        <strong>{product.name}</strong>
        {/* <p>{product.description}</p> */}
        {/* <p>Price: ${product.price}</p> */}
      </div>
    );
};

export default Product