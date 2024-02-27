import { Button, Card, CardHeader, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Pagination from "../../../Custommer/nComponent/Pagination"
import { useEffect, useState } from "react"
import { api, setHeaders } from "../../../config/apiConfig"
import { getAccessToken, getUserId } from "../../../utils/authUtils"
import { PaymentTpye, StateOrder } from "../../../utils/constan"
import { toast } from "react-toastify"
// import dayjs from "dayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { format, parse } from "date-fns"
import dayjs from "dayjs"

const strDateFormat = "dd-MM-yyyy HH:mm:ss"

const dateFormat = (date) => {
    return format(date, strDateFormat)
}
const parseDate = (strDate) => {
    try {
        return parse(strDate, strDateFormat)
    } catch (error) {
        return null
    }
}

const queryInit = {
    page: 0,
    size: 10,
    sort: null,

    keySearch: null,
    minTotalOrder: null,
    maxTotalOrder: null,
    minTotalCheckout: null,
    maxTotalCheckout: null,
    minTotalShopping: null,
    maxTotalShopping: null,
    minTotalDiscount: null,
    maxTotalDiscount: null,
    state: null,
    payment: null,
    startDate: null,
    endDate: null,
}
const orderInit = {
    id: null,
    quantity: null,
    userId: null,
    user: null,
    shippingAddress: null,
    totalOrder: null,
    totalShipping: null,
    totalDiscount: null,
    totalCheckout: null,
    items: null,
    payment: null,
    state: null,
    note: null,
    createDate: null,
    updateDate: null,
    new: false,
}

const OrdersAd = () => {
    const [orders, setOrders] = useState([])
    const [query, setQuery] = useState(queryInit)
    const [totalPage, setTotalPage] = useState(null)

    console.log(orders)
    useEffect(() => {
        const fetch = async () => {
            let params = Object.keys(query)
                .filter((key) => query[key])
                .map((key) => `${key}=${query[key]}`)
                .join("&")
            console.log("params", params)
            params = params ? `?${params}` : null
            const a = await api.post(`/order${params}`, "", { headers: { authorization: getAccessToken(), "x-client-id": getUserId() } })

            let dt = a.data.data.content

            dt = await Promise.all(
                dt.map(async (v) => {
                    const a = await api.post(`/user/${v.userId}`, "", { headers: { ...setHeaders() } })
                    return {
                        ...v,
                        user: a.data.data,
                        quantity: v.items.reduce((total, item) => total + item.quantity, 0),
                    }
                })
            ).catch((err) => console.log("err: ", err))

            console.log("dt", dt)
            setOrders(dt)
            setTotalPage(a.data.data.totalPage)
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...Object.keys(query).map((key) => query[key])])

    const handleChangeState = async (order, value) => {
        try {
            const a = await api.post(`/order/update-state/${order.id}`, { state: value, note: order.note })
            const newOrder = a.data.data

            setOrders((prev) => {
                return prev.map((v) => {
                    if (newOrder.id === v.id) return { ...v, ...newOrder }
                    return v
                })
            })
            toast("thay doi trang thai don hang thanh cong")
        } catch (error) {
            console.log(error.response)
        }
    }

    return (
        <div className="p-5">
            <Card className="mt-2">
                <CardHeader title="Oders"></CardHeader>
                <div>
                    filter
                    <div className="flex items-center space-x-3">
                        <div>
                            state:
                            <Select
                                variant="filled"
                                size="small"
                                value={query?.state}
                                onChange={(e) => setQuery((prev) => ({ ...prev, state: e.target.value ? e.target.value : null, page: 0 }))}
                            >
                                <MenuItem key={"csa"} value={""}>
                                    ALL
                                </MenuItem>
                                {Object.keys(StateOrder).map((key) => (
                                    <MenuItem key={key} value={StateOrder[key]}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div>
                            payment:
                            <Select
                                variant="filled"
                                size="small"
                                value={query?.payment}
                                onChange={(e) => setQuery((prev) => ({ ...prev, payment: e.target.value ? e.target.value : null, page: 0 }))}
                            >
                                <MenuItem key={"csa"} value={""}>
                                    ALL
                                </MenuItem>
                                {Object.keys(PaymentTpye).map((key) => (
                                    <MenuItem key={key} value={PaymentTpye[key]}>
                                        {key}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className="flex items-center">
                            date:
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                                    <div className="flex">
                                        <DateTimePicker
                                            label="date start"
                                            format="DD-MM-YYYY HH:mm:ss"
                                            value={parseDate(query?.startDate)}
                                            ampm={false}
                                            onChange={(date) => setQuery((prev) => ({ ...prev, startDate: dateFormat(date.$d) }))}
                                        />
                                        <DateTimePicker
                                            label="date end"
                                            format="DD-MM-YYYY HH:mm:ss"
                                            value={parseDate(query?.endDate)}
                                            ampm={false}
                                            onChange={(date) => setQuery((prev) => ({ ...prev, endDate: dateFormat(date.$d) }))}
                                        />
                                    </div>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <Button variant="contained" onClick={() => setQuery((prev) => ({ ...queryInit, page: prev.page, size: prev.size }))}>
                                All
                            </Button>
                        </div>
                    </div>
                </div>
                <TableContainer
                    component={Paper}
                    className="w-full flex flex-row flex-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 max-h-[68vh] overflow-y-auto"
                >
                    <Table className="w-full">
                        <TableHead>
                            <TableRow className="text-white bg-indigo-500">
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total order</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total shipping</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total discount</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total checkout</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date create</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Note</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">State</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders && orders.length != 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order?.id} className="bg-white">
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                        >
                                            <div className="flex">
                                                <img src={order?.user.image} alt="" className="w-10 h-10 rounded-full" />
                                                <p>{order?.user.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.quantity}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.totalOrder}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                            {order?.totalShipping}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                            {order?.totalDiscount}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                            {order?.totalCheckout}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.createDate}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.payment}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.note}</TableCell>

                                        <TableCell align="left">
                                            <Select
                                                variant="filled"
                                                size="small"
                                                value={order?.state}
                                                onChange={async (e) => await handleChangeState(order, e.target.value)}
                                            >
                                                {Object.keys(StateOrder).map((key) => (
                                                    <MenuItem key={key} value={StateOrder[key]}>
                                                        {key}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {/* <Button
                                                // onClick={() => handleProductDelete(product.id)}
                                                variant="outlined"
                                            >
                                                Xoá
                                            </Button> */}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <div>
                                    <div>no order with:</div>
                                    {Object.keys(query)
                                        .filter((key) => query[key] && key !== "size")
                                        .map((key) => `${key}=${query[key]}`)
                                        .join("\n")}
                                </div>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Pagination
                page={query?.page + 1}
                pageSize={query?.size}
                totalPage={totalPage}
                pageSizelist={[10, 20, 30]}
                onChange={({ page, pageSize }) => setQuery((prev) => ({ ...prev, page: page - 1, size: pageSize }))}
            />
        </div>
    )
}
export default OrdersAd
