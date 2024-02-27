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
import { DatePicker } from "@mui/x-date-pickers"
// import { DatePicker } from "antd"

const strDateFormat = "dd-MM-yyyy HH:mm:ss"

const dateFormat = (date) => {
    return format(date, strDateFormat)
}
const parseDate = (strDate) => {
    try {
        var a = parse(strDate, "dd-MM-yyyy HH:mm:ss")
        console.log("aaaaaa", a)
        return a
    } catch (error) {
        console.log("aaaaaa", "cc")
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
    startDate: dayjs(new Date()).hour(0).minute(0).second(0).format("DD-MM-YYYY HH:mm:ss"),
    endDate: dayjs(new Date()).hour(23).minute(59).second(59).format("DD-MM-YYYY HH:mm:ss"),
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

const Report = () => {
    const [orders, setOrders] = useState([])
    const [query, setQuery] = useState(queryInit)
    const [info, setInfo] = useState(null)
    const [typeDate, setTypeDate] = useState("day")

    console.log("query", query)

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
            dt = dt.map((v) => ({ ...v, quantity: v.items.reduce((total, item) => total + item.quantity, 0) }))
            const bb = dt.reduce(
                (acc, v) => ({
                    capital: acc.capital + v.capital,
                    revenue: acc.revenue + v.revenue,
                    profit: acc.profit + v.profit,
                    quantity: acc.quantity + v.quantity,
                }),
                { capital: 0, revenue: 0, profit: 0, quantity: 0 }
            )
            setInfo(bb)

            // dt = await Promise.all(
            //     dt.map(async (v) => {
            //         const a = await api.post(`/user/${v.userId}`, "", { headers: { ...setHeaders() } })
            //         return {
            //             ...v,
            //             user: a.data.data,
            //             quantity: v.items.reduce((total, item) => total + item.quantity, 0),
            //         }
            //     })
            // ).catch((err) => console.log("err: ", err))

            console.log("dt", dt)
            setOrders(dt)
            // setTotalPage(a.data.data.totalPage)
        }
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...Object.keys(query).map((key) => query[key])])

    return (
        <div className="p-5">
            <Card className="mt-2">
                <CardHeader title="Oders"></CardHeader>
                <div>
                    {info &&
                        Object.keys(info).map((key) => (
                            <p key={key}>
                                {key} : {info[key]}
                            </p>
                        ))}
                </div>
                <div>
                    filter
                    <div className="flex items-center space-x-3">
                        report by:
                        <Select variant="filled" size="small" value={typeDate} onChange={(e) => setTypeDate(e.target.value)}>
                            <MenuItem value="day">report at day</MenuItem>
                            <MenuItem value="month">report at month</MenuItem>
                            <MenuItem value="year">report at year</MenuItem>
                        </Select>
                        <div className="flex items-center">
                            date:
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker", "DatePicker", "DatePicker"]}>
                                    <div className="flex">
                                        {typeDate === "day" ? (
                                            <DatePicker
                                                label="day"
                                                format="DD-MM-YYYY"
                                                ampm={false}
                                                value={dayjs(query?.startDate, "DD-MM-YYYY")}
                                                onChange={(date) => {
                                                    console.log("ccccc", date)
                                                    setQuery((prev) => ({
                                                        ...prev,
                                                        startDate: dayjs(date).startOf("day").format("DD-MM-YYYY 00:00:00"),
                                                        endDate: dayjs(date).endOf("day").format("DD-MM-YYYY 23:59:59"),
                                                    }))
                                                }}
                                            />
                                        ) : typeDate === "month" ? (
                                            <DatePicker
                                                format="MM-YYYY"
                                                label={"month year"}
                                                views={["month", "year"]}
                                                value={dayjs(query?.startDate, "DD-MM-YYYY")}
                                                onChange={(date) => {
                                                    console.log("ccccc", date)
                                                    setQuery((prev) => ({
                                                        ...prev,
                                                        startDate: dayjs(date).startOf("month").format("DD-MM-YYYY 00:00:00"),
                                                        endDate: dayjs(date).endOf("month").format("DD-MM-YYYY 23:59:59"),
                                                    }))
                                                }}
                                            />
                                        ) : (
                                            <DatePicker
                                                label={"year"}
                                                views={["year"]}
                                                value={dayjs(query?.startDate, "DD-MM-YYYY")}
                                                onChange={(date) => {
                                                    console.log("ccccc", date)
                                                    setQuery((prev) => ({
                                                        ...prev,
                                                        startDate: dayjs(date).startOf("year").format("DD-MM-YYYY 00:00:00"),
                                                        endDate: dayjs(date).endOf("year").format("DD-MM-YYYY 23:59:59"),
                                                    }))
                                                }}
                                            />
                                        )}
                                    </div>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                            {/* <Button variant="contained" onClick={() => setQuery((prev) => ({ }))}>
                                result
                            </Button> */}
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
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">OrderId</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Von ban dau</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Doanh thu</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Loi nhuan</TableCell>
                                <TableCell className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date create</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders && orders.length != 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order?.id} className="bg-white">
                                        {/* <TableCell
                                            component="th"
                                            scope="row"
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                        >
                                            <div className="flex">
                                                <img src={order?.user.image} alt="" className="w-10 h-10 rounded-full" />
                                                <p>{order?.user.name}</p>
                                            </div>
                                        </TableCell> */}
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.id}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.quantity}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                            {order?.capital}
                                        </TableCell>
                                        {/* <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.totalCheckout}</TableCell> */}
                                        <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                            {order?.revenue}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words">
                                            {order?.profit}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order?.createDate}</TableCell>
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
            {/* <Pagination
                page={query?.page + 1}
                pageSize={query?.size}
                totalPage={totalPage}
                pageSizelist={[10, 20, 30]}
                onChange={({ page, pageSize }) => setQuery((prev) => ({ ...prev, page: page - 1, size: pageSize }))}
            /> */}
        </div>
    )
}
export default Report
