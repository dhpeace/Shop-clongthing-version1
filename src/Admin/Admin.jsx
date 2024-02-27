// eslint-disable-next-line no-unused-vars
import React, { useState } from "react"
import { useTheme } from "@mui/material/styles"
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery } from "@mui/material"
import { Route, Routes, useNavigate } from "react-router-dom"
// import EmailIcon from "@mui/icons-material/Email";
// import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DashboardIcon from "@mui/icons-material/Dashboard"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import CreateProductForm from "./Components/CreateProductForm"
import CustomersTable from "./Components/CustomersTable"
import OrderTable from "./Components/OrderTable"
import ProductsTable from "./Components/ProductsTable"
import Dashboard from "./Components/Dashboard"
import OrdersAd from "./Components/order/OrdersAd"

const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <DashboardIcon /> },
    { name: "Custommers", path: "/admin/custommers", icon: <DashboardIcon /> },
    { name: "Orders", path: "/admin/orders", icon: <DashboardIcon /> },
    {
        name: "AddProduct",
        path: "/admin/product/create",
        icon: <DashboardIcon />,
    },
    //   { name: "", path: "" },
]

function Admin() {
    const theme = useTheme()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
    const [sizeBarVisible, setSizeBarVisible] = useState(false)
    const navigate = useNavigate()

    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                // border: "1px solid blue",
                height: "100%",
            }}
        >
            <>
                {/* {isLargeScreen && <Toolbar />} */}
                <List>
                    {menu.map((item) => (
                        <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.name}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </>

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>Acount</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )

    return (
        <div>
            <div className="flex h-[100vh]">
                <CssBaseline />
                <div className="w-[15%] border border-r-gray-300 ">{drawer}</div>

                <div className="w-[85%]">
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/product/create" element={<CreateProductForm />}></Route>
                     
                        <Route path="/custommers" element={<CustomersTable />}></Route>
                        <Route path="/orders" element={<OrdersAd />}></Route>
                        <Route path="/products" element={<ProductsTable />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Admin
