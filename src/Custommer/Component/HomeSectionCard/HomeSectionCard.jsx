// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate();
  const handlClickToProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handlClickToProduct}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border border-collapse">
      <div className="h-[18rem] w-[15rem] overflow-hidden">
        <img
          className="object-cover h-full w-full"
          src={product.imageUrl}
          alt="product"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.title}</p>
      </div>
    </div>
  );
};

HomeSectionCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    brand: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default HomeSectionCard;
