// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/apiConfig";

const HomeSectionCard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/product?page=0&size=2");
        const products = response.data.data.content;
        setProducts(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetch();
  }, []);

  const handlClickToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          onClick={() => handlClickToProduct(product.id)}
          className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border border-collapse">
          <div className="h-[18rem] w-[15rem] overflow-hidden">
            <img
              className="object-cover h-full w-full"
              src={product.image}
              alt="product"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">
              {product.brand}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{product.title}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default HomeSectionCard;
