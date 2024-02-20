// eslint-disable-next-line no-unused-vars
import { Alert, AlertTitle, Grid } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";

function PaymentSucsecss() {
  const [paymentId, setPaymentId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const { oderId } = useSearchParams();

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          security="success"
          sx={{ mb: 6, width: "fix-content" }}>
          <AlertTitle>Thanh toán thành công</AlertTitle>
          Chúc mừng bạn đã thanh toán thành công đơn hàng
        </Alert>
      </div>

      {/* <OrderTracker activeStep={1} /> */}

      <Grid container className="space-y-5 py-5 pt-20">
        {order.order?.orderItems.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5"
            sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Grid item xs={6}>
              <div className="flex items-center">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/November2023/AD001.s2.5_26.jpg"
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p>items.product.title</p>
                  <div className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: item.color</span>
                    <span>Size: item.size</span>
                  </div>
                  <p>Seller : item.product.brand</p>
                  <p>item.price</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <AddressCard address={""} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PaymentSucsecss;
