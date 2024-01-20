// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Cart from "../Component/Cart/Cart";
import Navigation from "../Component/Navigation/Navigation";
import Footer from "../Component/Footer/Footer";
import Product from "../Component/Product/Product";
import ProductDetail from "../Component/ProductDetail/ProductDetail";

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
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CustomerRouters;
