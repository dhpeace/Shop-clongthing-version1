// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Product.css";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  return (
    <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-40">{product.brand}</p>
          <p className="">{product.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">{product.discountedPrice}</p>
          <p className="line-through opacity-50">{product.price}</p>
          <p className="text-green-600 font-semibold">
            {product.discountPersent}
          </p>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string,
    title: PropTypes.string,
    discountedPrice: PropTypes.number,
    price: PropTypes.number,
    discountPercent: PropTypes.number,
    imageUrl: PropTypes.string,
    discountPersent: PropTypes.number, // Add this line
  }).isRequired,
};
export default ProductCard;
