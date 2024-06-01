/**
 *
 * ProductList
 *
 */

import React from "react";

import { Link } from "react-router-dom";

const ProductList = (props) => {
  const { products } = props;

  return (
    <div className="p-list">
      {products.map((product, index) => (
        <Link
          to={`/dashboard/event/edit/${product._id}`}
          key={index}
          className="d-flex flex-row-reverse align-items-center mx-0 mb-3 product-box"
        >
          <div
            className="d-flex flex-column justify-content-center px-3 text-truncate"
            style={{ marginLeft: "12px" }}
          >
            <h4 className="text-truncate">{product.name}</h4>
            <p className="mr-2 text-truncate">{product.description}</p>
            <p className="mr-2 text-truncate">{product.location} 📍</p>
            {product?.brand?.name && (
              <p
                className="text-truncate"
                style={{
                  marginBottom: "0",
                  backgroundColor: "#f8f9fa",
                  padding: "2px 5px",
                  borderRadius: "5px",
                  width: "fit-content",
                  fontSize: "12px",
                }}
              >
                {product.brand.name}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
