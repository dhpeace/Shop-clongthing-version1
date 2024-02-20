import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./Auth/Reducer"
import { customerProductReducer } from "./Product/Reducer"
import { cartReducer } from "./Cart/Reducer"
import authv2Reducer from "./auth.slice"
import cartv2Reducer from "./cart.slice"

const rootReducers = combineReducers({
    authv2: authv2Reducer,
    cartv2: cartv2Reducer,
    auth: authReducer,
    product: customerProductReducer,
    cart: cartReducer,
})

// export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducers })
