import { Box, Button, Modal, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { cartAction, fetchAddToCart, fetchGetCartUser, selectCart } from "../../../State/cart.slice"
import { api } from "../../../config/apiConfig"
import { getUserId } from "../../../utils/authUtils"
import { checkoutAction } from "../../../State/checkout.slice"
import { toast } from "react-toastify"
import AuthModal from "../Auth/AuthModal"
import { selectAuth } from "../../../State/auth.slice"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 4,
}
const idata = {
    cartId: null,
    userId: null,
    address: null,
    discountId: null,
    items: [],
}

function Cart() {
    //  useEffect(()=>{
    //     const fetch= async()=>{
    //         const a =
    //     }
    //  })

    const dispatch = useDispatch()
    const cart = useSelector(selectCart.selectCart)
    const [showRegister, setShowRegister] = useState(false)

    const currentUser = useSelector(selectAuth.selectCurrentUser)

    const [selectDiscount, setSelectDiscout] = useState(null)

    const total = cart && cart.items ? cart.items.reduce((sum, v) => sum + v.price * v.quantity, 0) : 0

    const [show, setShow] = useState(false)
    const [discounts, setDiscounts] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const a = await api.get("/discount/by-user")
            let dc = a.data.data
            dc = dc.map((v) => ({ ...v, on: total < v.minOrderValue || v.userUsedIds.find((v) => v === getUserId()) ? false : true }))
            setDiscounts(dc)
        }
        fetch()
    }, [total])

    const navigate = useNavigate()
    const handleCheckout = async () => {
        dispatch(cartAction.setUserId(getUserId()))
        try {
            if (currentUser) {
                console.log("cccccc")

                const a = await api.post("/order/checkout-review", {
                    cartId: cart.id,
                    userId: cart.userId,
                    items: cart.items,
                    address: null,
                    discountId: selectDiscount?.id ? selectDiscount.id : null,
                })

                console.log("response", a)
                dispatch(checkoutAction.add(a.data.data))
                navigate("/checkout")
            } else {
                toast("plz login or register")
                setShowRegister(true)
                console.log("cc")
            }
        } catch (error) {
            toast(error.response)
            toast(error.response?.data?.message)
        }
    }

    const handleOnPlusOrMinus = async (item, value) => {
        dispatch(cartAction.addToCart({ ...item, quantity: value }))
        await dispatch(fetchAddToCart())
    }
    const handleRegisterSucces = async () => {
        const a = await api.post("/order/checkout-review", {
            cartId: cart.id,
            userId: cart.userId,
            items: cart.items,
            address: null,
            discountId: selectDiscount?.id ? selectDiscount.id : null,
        })
        dispatch(checkoutAction.add(a.data.data))
        navigate("/checkout")
    }

    return (
        <div className="bg-gray-100 p-6 w-[80%] mx-auto">
            <div className="lg:grid gap-10">
                <div className="col-span-2 space-y-3">
                    {cart &&
                        cart.items &&
                        cart.items.map((v, index) => (
                            <CartItem
                                key={index}
                                item={v}
                                onMinus={() => handleOnPlusOrMinus(v, -1)}
                                onPlus={() => handleOnPlusOrMinus(v, 1)}
                                onRemove={() => handleOnPlusOrMinus(v, Number(`-${v.quantity}`))}
                            />
                        ))}
                </div>
            </div>
            <div className="sticky top-0 mt-5 lg:mt-5">
                <div className="border-2 border-indigo-200 p-5 rounded-lg bg-white shadow-2xl">
                    <div className="flex justify-end text-indigo-800 pb-4 border-b-2 border-indigo-200">
                        <h2 onClick={() => setShow(!show)} className="uppercase font-bold ">
                            Chon ma hoac nhap ma giam gia
                        </h2>
                        {selectDiscount && <h4>{`{${selectDiscount.name}}`}</h4>}
                    </div>

                    <div className="space-y-3 font-semibold pt-4">
                        <div className="flex justify-between text-gray-700">
                            <span>Tạm tính</span>
                            <span className="font-bold">{total}đ</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Giảm giá</span>
                            <span className="font-bold text-red-500">
                                {selectDiscount ? (
                                    <span>
                                        {selectDiscount.type === "FIXED_AMOUNT" ? selectDiscount.value : (selectDiscount.value / 100) * total}
                                    </span>
                                ) : (
                                    "0"
                                )}
                                đ
                            </span>
                        </div>
                        {/* <div className="flex justify-between text-gray-700">
                            <span>Phí giao hàng</span>
                            <span className="font-bold text-gray-500">Miễn phí</span>
                        </div> */}
                        <div className="flex justify-between text-gray-700">
                            <span>Tổng</span>
                            <span className="font-bold">
                                {selectDiscount ? (
                                    <span>
                                        {selectDiscount.type === "FIXED_AMOUNT"
                                            ? total - selectDiscount.value
                                            : (1 - selectDiscount.value / 100) * total}
                                    </span>
                                ) : (
                                    total
                                )}
                                đ
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        type="submit"
                        className="mt-5 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Checkout
                    </button>
                </div>
            </div>
            <Modal open={show} onClose={() => setShow(!show)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div>
                        <span>Chọn Shopee Voucher</span>
                    </div>
                    <div className="flex space-x-4">
                        <TextField id="email" name="code" label="Voucher" fullWidth autoComplete="text" variant="filled" />
                        <Button variant="outlined" color="secondary">
                            ap dung
                        </Button>
                    </div>
                    <div className="h-96 overflow-y-auto space-y-3">
                        {discounts &&
                            discounts.map((v, i) => (
                                <div className="bg-blue-200 p-3 flex justify-between" key={i}>
                                    <div>name: {v?.name}</div>
                                    <div>
                                        giam:{v?.value} {v?.type === "FIXED_AMOUNT" ? "d" : "%"}
                                    </div>
                                    <div>don toi thieu: {v?.minOrderValue}d</div>
                                    <input
                                        type="radio"
                                        name="concac"
                                        checked={selectDiscount?.id === v.id}
                                        disabled={!v.on}
                                        onClick={() => {
                                            setSelectDiscout(v)
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className="flex justify-end pr-5 space-x-5">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                setShow(false)
                                setSelectDiscout(null)
                            }}
                        >
                            huy
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => setShow(false)}>
                            oke
                        </Button>
                    </div>
                </Box>
            </Modal>

            <AuthModal
                open={showRegister}
                isRegister={true}
                idUserMod={getUserId()}
                isConverModToUser={true}
                handleRegister={handleRegisterSucces}
                // urlReturnRegister={"/checkout"}
                handleClose={() => setShowRegister(false)}
            ></AuthModal>
        </div>
    )
}

export default Cart
