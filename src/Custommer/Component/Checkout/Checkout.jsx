// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import "./checkout.css"
import { useDispatch, useSelector } from "react-redux"
import { checkoutAction, selectCheckout } from "../../../State/checkout.slice"
import { selectAuth } from "../../../State/auth.slice"
import { selectCart } from "../../../State/cart.slice"
import { Button } from "@mui/material"
import { api } from "../../../config/apiConfig"
import { toast } from "react-toastify"
import { current } from "@reduxjs/toolkit"
import CartItem from "../Cart/CartItem"
import { getAccessToken, getUserId } from "../../../utils/authUtils"

const iCheckout = {
    cartId: null,
    userId: null,
    address: null,
    discountId: null,
    items: [],
}

const getVatiation = (product, item) => {
    const variation = product && product.variations ? product.variations.find((v) => v.id === item.productVariationId) : {}
    return variation
}

function Checkout() {
    const [checkout, setCheckout] = useState(iCheckout)
    const [product, setProduct] = useState({})
    const [variation, setVariation] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(selectAuth.selectCurrentUser)
    const checkoutaaaaa = useSelector(selectCheckout.selectCheckout)

    console.log("checkout", checkoutaaaaa)

    const cart = useSelector(selectCart.selectCart)
    console.log(currentUser)
    const [address, setAddress] = useState()

    useEffect(() => {
        const fetch = async (item) => {
            const a = await api.get(`/product/variation/${item.productVariationId}`)
            setProduct(a.data.data)
        }
        checkoutaaaaa.items.map((v) => fetch(v))
    }, [checkoutaaaaa])

    const handleCheckout = async () => {
        if (checkoutaaaaa.payment == null || checkoutaaaaa.payment == "") {
            toast("chon phuong thuc thanh toan")
        } else {
            // eslint-disable-next-line no-unused-vars
            const { totalOrder, totaShip, totalDiscount, totalCheckout, ...aa } = checkoutaaaaa
            const baseUrl = window.location.origin
            try {
                const a = await api.post(
                    `/order/order-user?urlRedirect=${baseUrl}/payment-redirect`,
                    { ...aa },
                    {
                        headers: { authorization: getAccessToken(), "x-client-id": getUserId() },
                    }
                )
                if (checkoutaaaaa.payment === "CASH") {
                    const { id } = a.data.data
                    navigate(`/payment-redirect?orderId=${id}&code=1&mesage=ok`)
                } else {
                    console.log("abccc", a)
                    const url = a.data.data.url
                    console.log("url", url)
                    if (url) {
                        window.location.href = url
                    }
                }
            } catch (error) {
                toast(error.response.data?.message)
            }
        }
        // @NotEmpty(message = "cartId not null")
        // private String cartId;
        // @NotEmpty(message = "userId not null")
        // private String userId;
        // // @NotEmpty(message = "address not null")
        // private String address;
        // @Default
        // private String payment = TypePayment.CASH.name();
        // private String discountId;
        // private @Valid List<CartProductReq> items;
        // else if (checkout.payment === "CASH") {
        //     const a = await api.post("/")
        // } else if (checkout.payment === "MOMO") {
        // }
    }
    console.log("checkout", checkout)
    return (
        <div className="checkout-wrapper py-5 home-wrapper-2">
            <div className="">
                <div className="">
                    <div className="checkout-left-data">
                        <h3 className="website-name">Xác thực đặt hàng</h3>
                        <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link className="total-price" to="/cart">
                                        Giỏ hàng
                                    </Link>
                                </li>
                                &nbsp;/&nbsp;
                                <li className="breadcrumb-ite total-price active" aria-current="page">
                                    Thông tin xác thực
                                </li>
                                &nbsp;/&nbsp;
                                <li className="breadcrumb-item total-price active">Gửi hàng</li>
                                &nbsp;/
                                <li className="breadcrumb-item total-price active" aria-current="page">
                                    Thanh toán
                                </li>
                            </ol>
                        </nav>
                        <div className="d-flex gap-30 information-user-checkout">
                            <h4 className="title-total">Thông tin người tham gia chiến dịch</h4>
                            <div className="user-details-total">
                                <p>Name: {currentUser?.name}</p>
                                <p>Email: {currentUser?.email}</p>
                                <p>Số điện thoại: 0989741798</p>
                                <p>Địa chỉ nhận hàng: {checkoutaaaaa.address ? checkoutaaaaa.address : "Chưa cập nhật"} </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="address-payment">Địa chỉ nhận hàng của bạn</h4>
                                <div className="w-300">
                                    <input
                                        type="text"
                                        value={checkoutaaaaa?.address}
                                        onChange={(e) => {
                                            dispatch(checkoutAction.add({ ...checkoutaaaaa, address: e.target.value }))
                                        }}
                                        placeholder="Địa chỉ giao hàng"
                                        className="form-control-checkout"
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="address-payment">Phương thúc thanh toán</h4>
                                <div className="flex-grow-1 space-y-2">
                                    <div className="space-x-2 flex">
                                        <input
                                            type="radio"
                                            name="aaaa"
                                            id="CASH"
                                            value={"CASH"}
                                            checked={checkoutaaaaa?.payment === "CASH"}
                                            onChange={(e) => dispatch(checkoutAction.add({ ...checkoutaaaaa, payment: e.target.value }))}
                                        />
                                        <label htmlFor="CASH">tien mat</label>
                                    </div>
                                    <div className="space-x-2 flex">
                                        <input
                                            type="radio"
                                            name="aaaa"
                                            id="MOMO"
                                            value={"MOMO"}
                                            checked={checkoutaaaaa?.payment === "MOMO"}
                                            onChange={(e) => dispatch(checkoutAction.add({ ...checkoutaaaaa, payment: e.target.value }))}
                                        />
                                        <label htmlFor="MOMO">chuyen khoan</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-5 mt-5">
                    <div className="border-bottom-total">
                        <div className="d-flex gap-10 mb-2 justify-between">
                            <div className="">{checkoutaaaaa && checkoutaaaaa.items.map((v, i) => <CartItem key={i} item={v} isCheckOut />)}</div>
                            <div className="w-[25%]">
                                <div className="border-bottom-calculator py-5">
                                    <div className="calculator-firt d-flex">
                                        <p className="calculator-title">Đơn hàng</p>
                                        <p className="calculator-total">
                                            {checkoutaaaaa.totalOrder} <b>vnđ</b>
                                        </p>
                                    </div>
                                    <div className="d-flex calculator-ship">
                                        <p className="calculator-ship-title">Phí ship</p>
                                        <p className="calculator-total">
                                            {checkoutaaaaa.totaShip} <b>vnđ</b>
                                        </p>
                                    </div>
                                    <div className="d-flex calculator-tax">
                                        <p className="calculator-tax-title">Giảm giá</p>
                                        <p className="calculator-tax-total">{checkoutaaaaa.totalDiscount} vnđ</p>
                                    </div>
                                </div>
                                <div className="d-flex calculator-last">
                                    <p className="calculator-last-title">Tổng đơn hàng</p>
                                    <p className="calculator-last-total">
                                        {checkoutaaaaa.totalCheckout} <b>vnđ</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <textarea
                            className="input-last-payment"
                            name="notes_order"
                            id="notes_order"
                            placeholder="Nhập ghi chú cho đơn hàng (nếu có)"
                        ></textarea> */}
                    </div>
                </div>
            </div>
            <div className="w-100 space-x-2 space-y-5 mt-5">
                <div className="d-flex justify-end align-items-center space-x-4">
                    <Link to="/cart" className="return-payment-cart">
                        <BiArrowBack className="me-2" />
                        Quay về giỏ hàng
                    </Link>
                    <Button variant="contained" className="button-checkout" onClick={handleCheckout}>
                        order
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
