// eslint-disable-next-line no-unused-vars
import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function OrderDetails() {
    // 
  return (
    <div className="px:5 lg:px-20">
      <div>
        <h1 className="font-bold text-xl py-7">Địa chỉ giao hàng</h1>
        <AddressCard />
      </div>
      <div className="py-20">
        <OrderTracker activeStep={3} />
      </div>

      <Grid className="space-y-5" container>
        {[1, 1, 1, 1].map((item, index) => (
          <Grid
            key={index}
            item
            container
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/November2023/AD001.s2.5_26.jpg"
                  alt=""
                />
              </div>
              <div className="space-y-2 ml-5">
                <p className="font-semibold">Set đồ Thể Thao Pro Active</p>
                <p className="space-x-5 opacity-50 text-xs font-semibold">
                  <span>color: Blink</span>
                  <span> Size: M</span>
                </p>
                <p>Price: 50000.000</p>
              </div>
            </Grid>

            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
                <span>Đánh giá và nhận xét sản phẩm</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default OrderDetails;
