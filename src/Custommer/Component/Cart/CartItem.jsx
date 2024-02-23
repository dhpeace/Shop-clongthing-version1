// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"
import { Button, IconButton } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { api } from "../../../config/apiConfig"

function CartItem({ item, onMinus, onPlus, onRemove, isCheckOut = false }) {
    const [product, setProduct] = useState({})
    useEffect(() => {
        const fetch = async () => {
            const a = await api.get(`/product/variation/${item.productVariationId}`)
            setProduct(a.data.data)
        }
        fetch()
    }, [])
    const variation = product && product.variations ? product.variations.find((v) => v.id === item.productVariationId) : {}
    return (
        <div className="p-5 shadow-lg border rounded-md bg-white">
            <div className="flex space-x-5 ">
                <div className="w-[50%] flex space-x-2">
                    <div className="flex-shrink-0">
                        <img className="w-24 h-24 object-cover rounded-md" src={product?.image} alt="" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">{product?.name}</h2>
                        <p className="text-gray-500">
                            {variation?.color} / {variation?.size}
                        </p>
                    </div>
                </div>

                <div className="w-[50%] flex justify-end space-x-5 items-center">
                    <div className="flex items-center space-x-2">
                        <p className="text-lg font-semibold text-blue-600">{product?.price}đ</p>
                        {/* <p className="text-sm text-gray-500 line-through">898.000đ</p> */}
                    </div>

                    <div className="flex items-center space-x-2">
                        {!isCheckOut && (
                            <IconButton color="primary" onClick={onMinus}>
                                <RemoveCircleIcon />
                            </IconButton>
                        )}
                        <span className="py-1 px-3 border rounded-md text-gray-700">{item?.quantity}</span>
                        {!isCheckOut && (
                            <IconButton color="primary">
                                <AddCircleIcon onClick={onPlus} />
                            </IconButton>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-lg font-semibold text-blue-600">{item?.price * item?.quantity}đ</p>
                    </div>
                    {!isCheckOut && (
                        <div className="flex items-center">
                            <Button variant="outlined" color="secondary" onClick={onRemove}>
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object,
    onMinus: PropTypes.func,
    onPlus: PropTypes.func,
    onRemove: PropTypes.func,
    isCheckOut: PropTypes.bool,
}

// LoginForm.propTypes = { returnUrl: PropTypes.string }
// LoginForm.defaultProps = {
//     returnUrl: "/",
// }

export default CartItem
