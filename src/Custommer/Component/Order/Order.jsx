import { Grid } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import OrderCard from "./OrderCard";

const orderStatus = [
  { lable: "On the way", value: "On the way" },
  { lable: "Deleviry", value: "Delevered" },
  { lable: "Cancelled", value: "Cancelled" },
  { lable: "Returned", value: "Returned" },
];

function Order() {
  return (
    <div className="px-5 lg:px-20 my-5">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg"> Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold"> Order Status</h1>

              {orderStatus.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}>
                    {option.lable}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-5">
            {[1, 1, 1, 1].map((item, index) => (
              <OrderCard key={index} />
            ))}
          </div>
          <OrderCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;
