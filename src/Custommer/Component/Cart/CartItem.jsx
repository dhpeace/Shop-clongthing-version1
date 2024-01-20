// eslint-disable-next-line no-unused-vars
import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function CartItem() {
  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover opject-top"
            src="https://mcdn.coolmate.me/image/June2023/mceclip4_14.jpg"
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">cai caqweqweqwerqerwq</p>
          <p className="opacity-70">wfqwrqwrqwrqwre</p>
          <p className="opacity-70 mt-2">qweqweqweqwewqr</p>
          <div className="flex space-x-5 items-center text-gray-900 pt-6">
            <p className="font-semibold">5235234</p>
            <p className="opacity-50 line-through">eqeqeqweqweqw</p>
            <p className="text-green-600 font-semibold">5235234</p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton>
            <RemoveCircleIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">3</span>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
        </div>

        <div>
          <Button>Remove</Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
