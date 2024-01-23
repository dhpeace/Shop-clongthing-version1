// eslint-disable-next-line no-unused-vars
import React from "react";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="lg:grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-3">
          {[1, 1, 1, 1].map((item, index) => (
            <CartItem key={index} />
          ))}
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border-2 border-indigo-200 p-5 rounded-lg bg-white shadow-2xl">
            <h2 className="uppercase font-bold text-indigo-800 pb-4 border-b-2 border-indigo-200">
              Giỏ hàng
            </h2>
            <div className="space-y-3 font-semibold pt-4">
              <div className="flex justify-between text-gray-700">
                <span>Tạm tính</span>
                <span className="font-bold">918.000đ</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Giảm giá</span>
                <span className="font-bold text-red-500">100.000đ</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Phí giao hàng</span>
                <span className="font-bold text-gray-500">Miễn phí</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tổng</span>
                <span className="font-bold">918.000đ</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              type="submit"
              className="mt-5 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
