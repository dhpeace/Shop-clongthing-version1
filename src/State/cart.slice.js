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
        const b = await api.get(`/cart/${a}`)
        return b.data.data
    }
})

export const fetchAddToCart = createAsyncThunk("cartv2/addToCart", async (_, { getState }) => {
    const state = getState()
    // Lấy state của slice cartv2
    const { userId, items } = state.cartv2

    const a = await api.post("/cart/add-to-cart", { userId, items: items.map((v) => ({ ...v, oldQuantity: 0 })) })

    return a.data.data

    // Sử dụng state ở đây để gửi request API hoặc thực hiện các xử lý khác
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
            const { productVariationId, price, quantity } = action.payload
            // let items = state.items

            const indexProductInCart = state.items.length > 0 ? state.items.findIndex((v) => v.productVariationId === productVariationId) : -1
            indexProductInCart !== -1
                ? (state.items[indexProductInCart].quantity += quantity)
                : state.items.push({ productVariationId, quantity, price })

            // items.filter((v) => {
            //     if (v.productVariationId === productVariationId) return true
            // })

            //
            // const { product, quantity, price } = action.payload
            // state.id = action.payload.id
            // state.userId = action.payload.userId
            // state.items = action.payload.items
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        logout: (state) => {
            state.id = null
            state.items = []
            state.userId = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCartUser.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchGetCartUser.rejected, (state, action) => {
                // state.status = StatusState.FAIL
            })
            .addCase(fetchGetCartUser.fulfilled, (state, action) => {
                // state.status = StatusState.SUCCESS
                state.id = action.payload.id
                state.userId = action.payload.userId
                state.items = action.payload.items
            })
            .addCase(fetchAddToCart.fulfilled, (state, action) => {
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
        return state.cartv2
    },
}
export { cartAction, selectCart }
// export default reducer
export default cartv2Reducer
