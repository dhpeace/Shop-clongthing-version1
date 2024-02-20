// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductDetail from "../Custommer/Component/ProductDetail/ProductDetail";
import Checkout from "../Custommer/Component/Checkout/Checkout";
import Homepage from "../Custommer/Pages/Homepage";
import Cart from "../Custommer/Component/Cart/Cart";
import Navigation from "../Custommer/Component/Navigation/Navigation";
import Footer from "../Custommer/Component/Footer/Footer";
import Product from "../Custommer/Component/Product/Product";
import PaymentSucsecss from "../Custommer/Component/Payment/PaymentSucsecss";
import Order from "../Custommer/Component/Order/Order";
import OrderDetails from "../Custommer/Component/Order/OrderDetails";

function CustomerRouters() {
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
        <Route path="/acount/order/" element={<Order />} />
        <Route path="/acount/order/:orderId" element={<OrderDetails />} />
        <Route path="/payment/:orderId" element={<PaymentSucsecss />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CustomerRouters;
