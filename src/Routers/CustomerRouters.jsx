// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import ProductDetail from "../Custommer/Component/ProductDetail/ProductDetail"
import Checkout from "../Custommer/Component/Checkout/Checkout"
import Homepage from "../Custommer/Pages/Homepage"
import Cart from "../Custommer/Component/Cart/Cart"
import Navigation from "../Custommer/Component/Navigation/Navigation"
import Footer from "../Custommer/Component/Footer/Footer"
import Product from "../Custommer/Component/Product/Product"
import { useDispatch } from "react-redux"
import { fetchInfo } from "../State/auth.slice"
import { fetchGetCartUser } from "../State/cart.slice"

function CustomerRouters() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchInfo())
            await dispatch(fetchGetCartUser())
        }
        fetch()
    }, [])
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path="/login" element={<Homepage />} />
                <Route path="/register" element={<Homepage />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRouters
