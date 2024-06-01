/**
 *
 * ProductList
 *
 */

import React from "react";

import { Link } from "react-router-dom";

const ProductList = (props) => {
  const { products, noHeader } = props;

  return (
    <div className="p-list">
      {products.map((product, index) => (
        <Link
          to={noHeader ? "#" : `/dashboard/event/edit/${product._id}`}
          key={index}
          className="d-flex flex-row-reverse align-items-center mx-0 mb-3 product-box"
        >
          <div
            className="d-flex flex-column justify-content-center px-3 text-truncate"
            style={{
              marginLeft: "12px",
              border: "1px solid #f1f1f1",
              width: "100%",
              padding: "10px",
              textAlign: "right",
            }}
          >
            <h4 className="text-truncate">{product.name}</h4>
            <p className="mr-2 text-truncate">{product.description}</p>
            <p className="mr-2 text-truncate">{product.location} 📍</p>
            {product?.brand?.name && (
              <p className="text-truncate">
                <span
                  style={{
                    marginBottom: "0",
                    backgroundColor: "#f8f9fa",
                    padding: "2px 5px",
                    borderRadius: "5px",
                    fontSize: "12px",
                  }}
                >
                  {product.brand.name}
                </span>
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
