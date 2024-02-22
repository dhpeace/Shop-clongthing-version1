// eslint-disable-next-line no-unused-vars
import React from "react"
import "./Product.css"
import PropTypes from "prop-types"

function ProductCard({ product }) {
    return (
        <div className="productCard w-[15rem] m-3 transition-all cursor-pointer">
            <div className="h-[20rem]">
                <img className="h-full w-full object-cover object-left-top" src={product.image} alt="" />
            </div>
            <div className="textPart bg-white p-3">
                <div>
                    <p className="font-bold opacity-40">{product.name}</p>
                    <p className="">{product.title}</p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* <p className="font-semibold">{product.discountedPrice}</p> */}
                    <p className=" opacity-50">{product.price}</p>
                    {/* <p className="text-green-600 font-semibold">
            {product.discountPersent}
          </p> */}
                </div>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        brand: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string, // Add this line
        discountedPrice: PropTypes.number,
        price: PropTypes.number,
        discountPercent: PropTypes.number,
        image: PropTypes.string,
        discountPersent: PropTypes.number,
    }).isRequired,
}
export default ProductCard
