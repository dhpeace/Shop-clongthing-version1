import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../config/apiConfig"
import { getUserId } from "../utils/authUtils"

// lay id vs jwt

/**
    user = {
        id: "65bea1086557c558938a92a8",
        name: "admin",
        email: "admin@gmail.com",
        image: "https://res.cloudinary.com/anhdaden/image/upload/v1705400758/demo_spring/vm2ydxq01xvz9rs3w3gn.jpg",
        roles: ["USER", "ADMIN"],
    }
]
 */

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: {
            cartId: null,
            userId: null,
            address: null,
            discountId: null,
            items: [],
        },
    },
    reducers: {
        add: (state, action) => {
            state.checkout = action.payload
        },
    },
})
const checkoutReducer = checkoutSlice.reducer

const checkoutAction = checkoutSlice.actions

// export select
const selectCheckout = {
    selectCheckout: (state) => {
        return state.checkout.checkout
    },
}

export { checkoutAction, selectCheckout }
// export default reducer
export default checkoutReducer
