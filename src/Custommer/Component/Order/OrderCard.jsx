import { Grid } from "@mui/material"
// eslint-disable-next-line no-unused-vars
import React from "react"
import AdjustIcon from "@mui/icons-material/Adjust"
import PropTypes from "prop-types"

function OrderCard({ order }) {
    return (
        <div className="p-5 shadow-md border hover:shadow-2xl">
            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                <Grid item xs={6}>
                    <div className="flex space-x-5 items-start cursor-pointer">
                        <img
                            className="w-20 h-20 object-cover object-top"
                            src="https://media.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/November2023/dt001.gym.14_72.jpg"
                            alt=""
                        />
                        <div>
                            <p className="font-bold">Set đồ Thể Thao Pro Active</p>
                            <p className="text-sm text-gray-500">Size: M</p>
                            <p className="text-sm text-gray-500">Color: Black</p>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    <p className="font-bold text-lg">5000.000</p>
                </Grid>

                <Grid item xs={4}>
                    {true && (
                        <div>
                            <p className="flex items-center text-sm text-green-600">
                                <AdjustIcon sx={{ width: "15px", height: "15px" }} className="mr-2" />
                                <span>Giao hàng ngày 19/03</span>
                            </p>
                            <p className="text-xs text-gray-500">mặt hàng của bạn đã được giao</p>
                        </div>
                    )}
                    {false && (
                        <p className="text-sm text-gray-500">
                            <span>Giao hàng dự kiến: 19/03</span>
                        </p>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}
OrderCard.propTypes = {
    order: PropTypes.object.isRequired,
}

export default OrderCard
