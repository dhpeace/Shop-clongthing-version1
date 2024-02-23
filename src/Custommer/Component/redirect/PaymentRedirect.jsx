import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getAccessToken, getUserId, setAccessToken, setRefeshToken, setUserId } from "../../../utils/authUtils"
import { useDispatch, useSelector } from "react-redux"
import { fetchInfo, selectAuth } from "../../../State/auth.slice"
import { Alert, AlertTitle, Grid } from "@mui/material"
import OrderTracker from "../Order/OrderTracker"
import AddressCard from "../AddressCard/AddressCard"
import { api } from "../../../config/apiConfig"
import { toast } from "react-toastify"
import CartItem from "../Cart/CartItem"

const i = {
    order: null,
    message: null,
    code: null,
}
const PaymentRedirect = () => {
    // const [data, setData] = useState({})
    const [data, setData] = useState(i)
    const currentUser = useSelector(selectAuth.selectCurrentUser)
    console.log(data)
    useEffect(() => {
        const handleRedirect = async () => {
            // Đọc dữ liệu từ URL sau chuyển hướng.
            const queryString = window.location.search
            const urlParams = new URLSearchParams(queryString)
            const aaa = {
                orderId: urlParams.get("orderId"),
                message: urlParams.get("message"),
                code: urlParams.get("code"),
            }

            try {
                const a = await api.post(`/order/${aaa.orderId}`, "", { headers: { authorization: getAccessToken(), "x-client-id": getUserId() } })
                setData({ code: aaa.code, message: aaa.code, order: a.data.data })
            } catch (error) {
                toast(error.response?.data?.message)
            }

            // Xử lý thông tin token hoặc thực hiện các thao tác khác.
            console.log("Data from URL:", urlParams)
        }
        // Gọi hàm xử lý redirect khi component được mount.
        handleRedirect()
    }, Object.keys(data))

    return (
        <div className="px-2 lg:px-36">
            <div className="flex flex-col justify-center items-center">
                <Alert variant="filled" security="success" sx={{ mb: 6, width: "fix-content" }}>
                    <AlertTitle>Thanh toán thành công</AlertTitle>
                    Chúc mừng bạn đã thanh toán thành công đơn hàng
                </Alert>
            </div>

            <OrderTracker activeStep={1} />

            <Grid container className="space-y-5 py-5 pt-20">
                {data &&
                    data.order &&
                    data.order.items &&
                    data.order.items.map((v, index) => (
                        <Grid
                            key={index}
                            container
                            className="shadow-xl rounded-md p-5"
                            sx={{ alignItems: "center", justifyContent: "space-between" }}
                        >
                            <Grid item xs={6}>
                                <CartItem item={v} isCheckOut></CartItem>
                            </Grid>

                            <Grid item>
                                <div className="space-y-3">
                                    <p className="font-semibold"> {currentUser.name}</p>
                                    <p> {data?.order?.shippingAddress}</p>
                                    <div className="space-y-1">
                                        <p className="font-semibold">Phone Number</p>
                                        <p> 0989741797</p>
                                    </div>
                                    trạng thái : {data?.order?.state}
                                </div>
                            </Grid>
                        </Grid>
                    ))}
            </Grid>
        </div>
    )
}
export default PaymentRedirect

// http://localhost:5173/login-redirect/redirect?
// userId=65d6c02c4933346ad82e3818
// &accessToken=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0dW5nYmFjaC50dHNAZ21haWwuY29tIiwiaWF0IjoxNzA4NTcyNzE2LCJleHAiOjE3MDg3NDU1MTZ9.gEzP6QWsi_osb25F_8uoysIJ9xqLvHvOr8JCr6-9NA28CZQic5RaxYTMwucwWN3kX-MweN50eN_J20PYmYAtLan6akr_1rPvPvJ5oRFhJ4vFHvaHpB7DTiomNFau3RDQ7EKy8iawDfxGFAX6CbNDCgAFhuo7CPxDQDMVgXg5jiTVQgigsHk61re7pFHvNWkW8r0BpIo3omBB7hGRuGv0qqkRj_1sJvdBkfL2JrxL8Tb5ByZGL1pC-6g1ShJ1KaeN7lwOubsRcCOGFvAOokO86fV2FVZ58ectBhSrzJjzT93nRJhtLlD6NuIvD2kHhOYDlRBW7dEcO3y_dBqa3wtxQw
// &refreshToken=eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0dW5nYmFjaC50dHNAZ21haWwuY29tIiwiaWF0IjoxNzA4NTcyNzE2LCJleHAiOjE3MDg1ODI3OTZ9.GYYyWcQXd2NjaQ-zaTB3IXLlgrQ20ApoWs6sM6iZlG_6QlUJebx9Y6w4ngdUl22QQT2jzU-Br8xPpemgnbDU3AGdY7OoGLSZjYdukm70dPg2u8SLd3fD6SXjOXrEG4BSp2qLjqncNqpZNDDZwbWTBqWAgTRdSsvgqUX93WFjU0cCjLXVicU5--HzYPtBluVGTGBn55gMHOzxT4aMEgfW5ZGkOKhRA-d4gyUwOY0m8ESY_i1TyBF8kAjzMJe7MfTGaT6hUK9mSOrMj36wHMzFYNPazMtKOKqo5SritO2uRsFFrtV4DkaFkgm7ILh_0mRhFK9u6l7RKHrQi1Mo-SUNdg
