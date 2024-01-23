// eslint-disable-next-line no-unused-vars
import React from "react";
import { Avatar, Box, Grid, Rating } from "@mui/material";

function ProductReviewCart() {
  return (
    <div>
      <Grid container spacing={2} gap={1}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white bg-purple-700"
              sx={{ width: 56, height: 56 }}>
              TB
            </Avatar>
          </Box>
        </Grid>

        <Grid item xs={11}>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex-col">
                <h3 className="text-lg font-bold text-gray-800">
                  Bach Thanh Tung
                </h3>
                <p className="text-xs ml-2 text-gray-600">1 ngày trước</p>
              </div>
              <div className="flex-col">
                <p className="text-sm">
                  <span className="text-green-600 font-bold">5.0</span>
                  <br />
                  <span className="text-gray-600">Xác minh từ người mua</span>
                </p>
              </div>
            </div>
            <div>
              <Rating name="half-rating" value={4.5} precision={0.5} readOnly />
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                quibusdam, voluptatum, quia, quos doloribus voluptatem
                voluptates laboriosam quod quidem cumque voluptate. Quisquam
                voluptate, quibusdam quia quidem voluptas quod doloribus.
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductReviewCart;
