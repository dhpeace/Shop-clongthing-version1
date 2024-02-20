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

export const fetchGetCartUser = createAsyncThunk("cartv2/getCartUser", async () => {
    const a = getUserId()
    if (a) {
        console.log(a)
        const b = await api.get(`/cart/${a}`)
        return b.data.data
    }
})

const CartSlice = createSlice({
    name: "cartv2",
    initialState: {
        id: null,
        userId: null,
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.id = action.payload.id
            state.userId = action.payload.userId
            state.items = action.payload.items
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCartUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchGetCartUser.rejected, (state, action) => {
                // state.status = StatusState.FAIL
                console.log(action.error)
            })
            .addCase(fetchGetCartUser.fulfilled, (state, action) => {
                // state.status = StatusState.SUCCESS
                state.id = action.payload.id
                state.userId = action.payload.userId
                state.items = action.payload.items
            })
    },
})
const cartv2Reducer = CartSlice.reducer

const cartAction = CartSlice.actions

// export select
const selectCart = {
    selectCart: (state) => {
        console.log(state)
        return state.cartv2
    },
}
export { cartAction, selectCart }
// export default reducer
export default cartv2Reducer
