import { Grid, Select } from "@mui/material"
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
// import OrderCard from "./OrderCard"
import { StateOrder } from "../../../utils/constan"
import { useParams } from "react-router-dom"
import { api, setHeaders } from "../../../config/apiConfig"
import { getUserId } from "../../../utils/authUtils"
import { useSelector } from "react-redux"
import { selectAuth } from "../../../State/auth.slice"
import CartItem from "../Cart/CartItem"
const getTitle = (state) => {
    const b = Object.keys(StateOrder).filter((key) => StateOrder[key] === state)
    return b ? b : null
}
function Order() {
    const [orders, setOders] = useState([])
    const [state, setState] = useState(null)

    console.log("order", orders)
    const currentUser = useSelector(selectAuth.selectCurrentUser)

    useEffect(() => {
        const fetch = async () => {
            const params = state ? `?state=${state}` : ""
            const a = await api.post(`/order/userId/${getUserId()}${params}`, "", { headers: { ...setHeaders() } })
            console.log("aaaaaaa", a)
            let dt = a.data.data
            dt = dt.map((v) => ({ ...v, user: currentUser, quantity: v.items.reduce((total, item) => total + item.quantity, 0) }))

            setOders(dt)
        }
        fetch()
    }, [state])

    return (
        <div className="px-5 lg:px-20 my-5">
            <div className="flex justify-center">{!state ? <h1>All order</h1> : getTitle(state)}</div>
            <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid item xs={2.5}>
                    <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
                        <h1 className="font-bold text-lg"> Filter</h1>
                        <div className="space-y-4 mt-10">
                            <h1 className="font-semibold"> Order Status</h1>

                            <div className="flex items-center">
                                <input
                                    value=""
                                    onChange={() => setState(null)}
                                    type="radio"
                                    name="aaa"
                                    id="all"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="ml-3 text-sm text-gray-600" htmlFor={"all"}>
                                    all
                                </label>
                            </div>
                            {Object.keys(StateOrder).map((key) => (
                                <div key={key} className="flex items-center">
                                    <input
                                        value={StateOrder[key]}
                                        onChange={(e) => setState(e.target.value)}
                                        type="radio"
                                        name="aaa"
                                        id={key}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label className="ml-3 text-sm text-gray-600" htmlFor={key}>
                                        {key}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className="space-y-5 ">
                        {orders && orders.length != 0
                            ? orders.map((v) => (
                                  <div key={v.id} className="flex w-[100%] bg-slate-400 p-2">
                                      <div className="w-[50%]">
                                          <h1>{v.id}</h1>
                                          <h1>trang thai: {v?.state}</h1>
                                          <h1>total order: {v?.totalOrder}</h1>
                                          <h1>total shipping: {v?.totalShipping}</h1>
                                          <h1>total discount: {v?.totalDiscount}</h1>
                                          <h1>total checkout: {v?.totalCheckout}</h1>
                                      </div>
                                      <div className="">
                                          {v?.items.map((item, i) => (
                                              <CartItem key={i} isCheckOut item={item}></CartItem>
                                          ))}
                                      </div>
                                  </div>
                              ))
                            : `no order with ${state}`}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Order
