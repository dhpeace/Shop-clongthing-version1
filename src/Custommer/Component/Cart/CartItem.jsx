// eslint-disable-next-line no-unused-vars
import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function CartItem() {
  return (
    <div className="p-5 shadow-lg border rounded-md bg-white">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          <img
            className="w-24 h-24 object-cover rounded-md"
            src="https://mcdn.coolmate.me/image/June2023/mceclip4_14.jpg"
            alt=""
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Set đồ Thể Thao Pro Active</h2>
          <p className="text-gray-500">Xám / M</p>
          <div className="flex items-center space-x-2">
            <p className="text-lg font-semibold text-blue-600">699.000đ</p>
            <p className="text-sm text-gray-500 line-through">898.000đ</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-5">
        <div className="flex items-center space-x-2">
          <IconButton color="primary">
            <RemoveCircleIcon />
          </IconButton>
          <span className="py-1 px-3 border rounded-md text-gray-700">3</span>
          <IconButton color="primary">
            <AddCircleIcon />
          </IconButton>
        </div>
        <Button variant="outlined" color="secondary">
          Remove
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
